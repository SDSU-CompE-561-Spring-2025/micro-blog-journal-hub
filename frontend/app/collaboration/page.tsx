'use client';

import { useState, useEffect, useMemo, FormEvent } from "react";
import { Header } from "@/components/header";
import NavBar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Search, ArrowUpDown } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Frontend interfaces
interface Entry {
    id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

interface Journal {
    id: number;
    title: string;
    description: string;
    privacy: number;
    collaborators?: User[];
}

interface User {
    id: number;
    email: string;
    name?: string;
}

// Helper to get auth token
const getAuthToken = (): string | null => {
    if (typeof window !== "undefined") {
        // Check both possible token keys for backward compatibility
        return localStorage.getItem("token") || localStorage.getItem("authToken");
    }
    return null;
};

export default function CollaborationPage() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [journals, setJournals] = useState<Journal[]>([]);
    const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
    const [newEntryTitle, setNewEntryTitle] = useState("");
    const [newEntryContent, setNewEntryContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
    const [isAddingCollaborator, setIsAddingCollaborator] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [filterText, setFilterText] = useState("");
    const [showCreateEntry, setShowCreateEntry] = useState(false);

    // Fetch user's journals
    const fetchJournals = async () => {
        setIsLoading(true);
        setError(null);
        const token = getAuthToken();
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/journals/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Unauthorized or Access Denied. Please check your login status.");
                }
                const errorData = await response.json();
                throw new Error(errorData.detail || `Error fetching journals: ${response.statusText}`);
            }
            const data: Journal[] = await response.json();
            setJournals(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch entries for selected journal
    const fetchEntriesForJournal = async (journalId: number) => {
        setIsLoading(true);
        setError(null);
        const token = getAuthToken();
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/journals/${journalId}/entries/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Unauthorized or Access Denied. Please check your login status.");
                }
                const errorData = await response.json();
                throw new Error(errorData.detail || `Error fetching entries: ${response.statusText}`);
            }
            const data: Entry[] = await response.json();
            setEntries(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle journal selection
    const handleJournalSelect = (journal: Journal) => {
        setSelectedJournal(journal);
        fetchEntriesForJournal(journal.id);
    };

    // Create new entry
    const handleCreateEntry = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedJournal) {
            setError("Please select a journal first");
            return;
        }
        if (!newEntryTitle.trim() || !newEntryContent.trim()) {
            setError("Title and content are required");
            return;
        }

        setIsLoading(true);
        setError(null);
        const token = getAuthToken();
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/journals/${selectedJournal.id}/entries/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: newEntryTitle,
                    content: newEntryContent,
                }),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Unauthorized or Access Denied creating entry.");
                }
                const errorData = await response.json();
                throw new Error(errorData.detail || `Error creating entry: ${response.statusText}`);
            }

            // Reset form and refresh entries
            setNewEntryTitle("");
            setNewEntryContent("");
            setShowCreateEntry(false);
            await fetchEntriesForJournal(selectedJournal.id);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete entry
    const handleDeleteEntry = async (entryId: number) => {
        if (!selectedJournal) {
            setError("Please select a journal first");
            return;
        }

        if (!confirm("Are you sure you want to delete this entry?")) {
            return;
        }

        setIsLoading(true);
        setError(null);
        const token = getAuthToken();
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/journals/${selectedJournal.id}/entries/${entryId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Unauthorized or Access Denied deleting entry.");
                }
                const errorData = await response.json();
                throw new Error(errorData.detail || `Error deleting entry: ${response.statusText}`);
            }

            // Refresh entries after deletion
            await fetchEntriesForJournal(selectedJournal.id);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Add collaborator to journal
    const handleAddCollaborator = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedJournal) {
            setError("Please select a journal first");
            return;
        }
        if (!newCollaboratorEmail.trim()) {
            setError("Please enter a collaborator's email");
            return;
        }

        setIsAddingCollaborator(true);
        setError(null);
        const token = getAuthToken();
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setIsAddingCollaborator(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/journals/${selectedJournal.id}/collaborators`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ collaborator_email: newCollaboratorEmail }),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Unauthorized or Access Denied adding collaborator.");
                }
                const errorData = await response.json();
                throw new Error(errorData.detail || `Error adding collaborator: ${response.statusText}`);
            }

            // Refresh journal data to get updated collaborators
            await fetchJournals();
            setNewCollaboratorEmail("");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsAddingCollaborator(false);
        }
    };

    // Remove collaborator from journal
    const handleRemoveCollaborator = async (collaboratorId: number) => {
        if (!selectedJournal) {
            setError("Please select a journal first");
            return;
        }

        setIsLoading(true);
        setError(null);
        const token = getAuthToken();
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/journals/${selectedJournal.id}/collaborators/${collaboratorId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Unauthorized or Access Denied removing collaborator.");
                }
                const errorData = await response.json();
                throw new Error(errorData.detail || `Error removing collaborator: ${response.statusText}`);
            }

            // Refresh journal data to get updated collaborators
            await fetchJournals();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Sort and filter entries
    const sortedAndFilteredEntries = useMemo(() => {
        let filtered = entries;

        // Apply text filter
        if (filterText) {
            filtered = entries.filter(
                entry =>
                    entry.title.toLowerCase().includes(filterText.toLowerCase()) ||
                    entry.content.toLowerCase().includes(filterText.toLowerCase())
            );
        }

        // Sort entries
        return [...filtered].sort((a, b) => {
            const dateA = new Date(sortOrder === 'desc' ? a.created_at : b.created_at);
            const dateB = new Date(sortOrder === 'desc' ? b.created_at : a.created_at);
            return dateA.getTime() - dateB.getTime();
        });
    }, [entries, filterText, sortOrder]);

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        fetchJournals();
    }, []);

    // ... existing code ...

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
            <Header />
            <NavBar />

            <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-slate-100">Collaboration</h1>

                {error && (
                    <p className="text-red-600 bg-red-100 p-3 rounded mb-4 dark:text-red-400 dark:bg-red-900/30">
                        {error}
                    </p>
                )}

                <Card className="bg-gray-200 p-4 mb-6 dark:bg-slate-800">
                    <CardContent className="p-0">
                        {/* Journal Selection Section */}
                        <div className="bg-blue-100 rounded-xl p-6 mb-6 dark:bg-slate-700">
                            <h3 className="text-xl mb-4 text-gray-800 dark:text-slate-200">Select a Journal to Collaborate On</h3>
                            {isLoading && journals.length === 0 ? (
                                <p className="text-gray-600 dark:text-slate-400">Loading journals...</p>
                            ) : journals.length === 0 ? (
                                <p className="text-gray-600 dark:text-slate-400">No journals found. Create one to get started!</p>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-4">
                                    {journals.map((journal) => (
                                        <button
                                            key={journal.id}
                                            onClick={() => handleJournalSelect(journal)}
                                            className={`p-4 rounded-lg text-left transition-colors ${selectedJournal?.id === journal.id
                                                ? 'bg-blue-200 dark:bg-slate-600'
                                                : 'bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700'
                                                }`}
                                        >
                                            <h4 className="font-semibold text-gray-800 dark:text-slate-200">{journal.title}</h4>
                                            {journal.description && (
                                                <p className="text-sm text-gray-600 dark:text-slate-400">{journal.description}</p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Collaborators Management Card */}
                        <Card className="bg-blue-100 p-4 dark:bg-slate-700">
                            <CardHeader className="p-0 pb-4">
                                <CardTitle className="text-xl text-gray-800 dark:text-slate-200">
                                    Manage Collaborators
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {selectedJournal ? (
                                    <>
                                        <form onSubmit={handleAddCollaborator} className="mb-4">
                                            <div className="flex gap-2">
                                                <Input
                                                    type="email"
                                                    placeholder="Collaborator's email"
                                                    value={newCollaboratorEmail}
                                                    onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                                                    className="bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                />
                                                <Button
                                                    type="submit"
                                                    disabled={isAddingCollaborator}
                                                    className="whitespace-nowrap bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                                                >
                                                    {isAddingCollaborator ? "Adding..." : "Add"}
                                                </Button>
                                            </div>
                                        </form>

                                        {selectedJournal.collaborators && selectedJournal.collaborators.length > 0 ? (
                                            <ul className="space-y-2">
                                                {selectedJournal.collaborators.map((collaborator) => (
                                                    <li
                                                        key={collaborator.id}
                                                        className="flex items-center justify-between p-2 bg-white rounded-md dark:bg-slate-800"
                                                    >
                                                        <span className="text-gray-700 dark:text-slate-300">
                                                            {collaborator.name || collaborator.email}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleRemoveCollaborator(collaborator.id)}
                                                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-600 dark:text-slate-400">
                                                No collaborators yet. Add someone to start collaborating!
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-gray-600 dark:text-slate-400">
                                        Select a journal to manage collaborators
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Entry Management Section */}
                        <div className="space-y-6">
                            {selectedJournal && (
                                <Card className="bg-blue-100 p-4 dark:bg-slate-700">
                                    <CardHeader className="p-0 pb-4">
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-xl text-gray-800 dark:text-slate-200">
                                                Journal Entries
                                            </CardTitle>
                                            <Button
                                                onClick={() => setShowCreateEntry(!showCreateEntry)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                                            >
                                                {showCreateEntry ? "Cancel" : "New Entry"}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0 space-y-4">
                                        {/* Entry Creation Form */}
                                        {showCreateEntry && (
                                            <form onSubmit={handleCreateEntry} className="space-y-4 p-4 bg-white rounded-lg dark:bg-slate-800">
                                                <div>
                                                    <label htmlFor="entryTitle" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                        Title
                                                    </label>
                                                    <Input
                                                        id="entryTitle"
                                                        type="text"
                                                        placeholder="Entry title"
                                                        value={newEntryTitle}
                                                        onChange={(e) => setNewEntryTitle(e.target.value)}
                                                        className="bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="entryContent" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                        Content
                                                    </label>
                                                    <Textarea
                                                        id="entryContent"
                                                        placeholder="Type your journal entry here..."
                                                        value={newEntryContent}
                                                        onChange={(e) => setNewEntryContent(e.target.value)}
                                                        className="h-32 bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                        required
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="w-full bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
                                                >
                                                    {isLoading ? "Saving..." : "Save Entry"}
                                                </Button>
                                            </form>
                                        )}

                                        {/* Entry List Controls */}
                                        <div className="flex gap-4 items-center">
                                            <Input
                                                type="text"
                                                placeholder="Filter entries..."
                                                value={filterText}
                                                onChange={(e) => setFilterText(e.target.value)}
                                                className="bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                            />
                                            <Button
                                                variant="outline"
                                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                                className="whitespace-nowrap"
                                            >
                                                Sort {sortOrder === 'asc' ? '↑' : '↓'}
                                            </Button>
                                        </div>

                                        {/* Entries List */}
                                        {isLoading && sortedAndFilteredEntries.length === 0 ? (
                                            <p className="text-gray-600 dark:text-slate-400">Loading entries...</p>
                                        ) : sortedAndFilteredEntries.length === 0 ? (
                                            <p className="text-gray-600 dark:text-slate-400">
                                                {filterText ? "No entries match your filter." : "No entries yet. Create one to get started!"}
                                            </p>
                                        ) : (
                                            <div className="space-y-3">
                                                {sortedAndFilteredEntries.map((entry) => (
                                                    <div
                                                        key={entry.id}
                                                        className="p-4 bg-white rounded-lg shadow dark:bg-slate-800"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h4 className="font-semibold text-lg text-gray-800 dark:text-slate-100">
                                                                {entry.title}
                                                            </h4>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDeleteEntry(entry.id)}
                                                                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <p className="text-gray-600 dark:text-slate-300 whitespace-pre-wrap mb-2">
                                                            {entry.content}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-slate-400">
                                                            Created: {formatDate(entry.created_at)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
} 