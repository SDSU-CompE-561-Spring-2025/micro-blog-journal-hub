"use client";

import { Header } from "@/components/header";
import NavBar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

// Define the base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const LOGIN_PAGE_PATH = "/login"; // Define your login page path

// Frontend interface matching backend's EntryOut schema
interface Entry {
  id: number;
  title: string;
  content: string;
  user_id: number;
}

// Helper to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export default function CollaborationPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

  // Function to handle unauthorized access by redirecting to login
  const handleUnauthorized = (message: string = "Session expired or unauthorized. Please log in.") => {
    setError(message);
    // Clear token if it's invalid, or let login page handle it
    // localStorage.removeItem("authToken"); 
    router.push(LOGIN_PAGE_PATH);
  };

  // Fetch entries for the current user
  const fetchEntries = async () => {
    setIsLoading(true);
    setError(null);
    const token = getAuthToken();
    if (!token) {
      // No token, redirect to login immediately
      setIsLoading(false);
      handleUnauthorized("Authentication token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/entries/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          handleUnauthorized();
          return; // Stop further processing
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error fetching entries: ${response.statusText}`);
      }
      const data: Entry[] = await response.json();
      setEntries(data);
    } catch (err: any) {
      // If error is due to network or other issues, but not specifically auth, just set error
      // Auth errors should be caught by response.status check
      if (!(err.message.includes("Unauthorized") || err.message.includes("Access Denied"))) {
          setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new entry
  const handleCreateEntry = async (e: FormEvent) => {
    e.preventDefault();
    if (!newEntryTitle.trim() || !newEntryContent.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    const token = getAuthToken();
    if (!token) {
      setIsLoading(false);
      handleUnauthorized("Authentication token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/entries/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newEntryTitle, content: newEntryContent }),
      });
      if (!response.ok) {
         if (response.status === 401 || response.status === 403) {
          handleUnauthorized("Failed to create entry. Please log in again.");
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error creating entry: ${response.statusText}`);
      }
      setNewEntryTitle("");
      setNewEntryContent("");
      await fetchEntries(); // Refetch all entries to include the new one
    } catch (err: any) {
        if (!(err.message.includes("Unauthorized") || err.message.includes("Access Denied"))) {
          setError(err.message);
        }
    } finally {
      // isLoading is managed by fetchEntries
    }
  };

  // Delete an entry
  const handleDeleteEntry = async (entryId: number) => {
    setIsLoading(true); 
    setError(null);
    const token = getAuthToken();
    if (!token) {
      setIsLoading(false);
      handleUnauthorized("Authentication token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/entries/${entryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          handleUnauthorized("Failed to delete entry. Please log in again.");
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error deleting entry: ${response.statusText}`);
      }
      await fetchEntries(); // Refetch all entries after deletion
    } catch (err: any) {
        if (!(err.message.includes("Unauthorized") || err.message.includes("Access Denied"))) {
            setError(err.message);
        }
    } finally {
      // isLoading will be handled by the subsequent fetchEntries call
    }
  };

  // Fetch entries when the component mounts
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setIsLoading(false); 
      handleUnauthorized("You must be logged in to view this page.");
    } else {
      fetchEntries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 


  if (isLoading && !entries.length && !error) { // Show loading only if no error and still fetching initial data
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
            <Header />
            <NavBar />
            <main className="flex-1 p-4 max-w-4xl mx-auto w-full flex justify-center items-center">
                <p className="text-xl text-gray-900 dark:text-slate-100">Loading collaboration data...</p>
            </main>
        </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <NavBar />
      
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-slate-100">Collaboration</h1>

        {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4 dark:bg-red-900/30 dark:text-red-400">{error}</p>}

        {!isLoading || entries.length > 0 ? (
            <Card className="bg-gray-100 dark:bg-gray-800 p-4 mb-6"> {/* Outer card style match */}
            <CardContent className="p-0">
                <div className="bg-blue-100 dark:bg-slate-700 rounded-xl p-6 mb-6"> {/* Inner section bg match */}
                <h3 className="text-xl mb-4 text-gray-800 dark:text-slate-100">Which Journal are we working on today!</h3> {/* Text color match */}
                <div className="grid md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-slate-300"> {/* List text color match */}
                    <li>Sunny San Diego</li>
                    <li>Visit to the beach</li>
                    <li>Friends in Cornado</li>
                    </ul>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-slate-300"> {/* List text color match */}
                    <li>Cars & Coffee</li>
                    <li>Code 101</li>
                    <li>Thoughts I think of</li>
                    </ul>
                </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-100 dark:bg-slate-700 p-4"> {/* Inner card style match */}
                    <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl text-gray-800 dark:text-slate-100">Add friends:</CardTitle> {/* Title text color match */}
                    </CardHeader>
                    <CardContent className="p-0">
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-slate-300"> {/* List text color match */}
                        <li>Friend 1</li>
                        <li>Friend 2</li>
                        <li>Friend 3</li>
                    </ul>
                    </CardContent>
                </Card>

                <Card className="bg-blue-100 dark:bg-slate-700 p-4"> {/* Inner card style match */}
                    <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl text-gray-800 dark:text-slate-100">Create New Entry</CardTitle> {/* Title text color match */}
                    </CardHeader>
                    <CardContent className="p-0">
                    <form onSubmit={handleCreateEntry} className="space-y-4">
                        <div>
                        <label htmlFor="entryTitle" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1"> {/* Label text color match */}
                            Title
                        </label>
                        <Input
                            id="entryTitle"
                            type="text"
                            placeholder="Entry title"
                            value={newEntryTitle}
                            onChange={(e) => setNewEntryTitle(e.target.value)}
                            className="bg-white dark:bg-slate-600 dark:text-slate-100 dark:placeholder-slate-400 border-gray-300 dark:border-slate-500 focus:ring-blue-500 dark:focus:ring-blue-500" /* Input style match */
                            required
                        />
                        </div>
                        <div>
                        <label htmlFor="entryContent" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1"> {/* Label text color match */}
                            Content
                        </label>
                        <Textarea
                            id="entryContent"
                            placeholder="Type your journal entry here...."
                            value={newEntryContent}
                            onChange={(e) => setNewEntryContent(e.target.value)}
                            className="h-32 bg-white dark:bg-slate-600 dark:text-slate-100 dark:placeholder-slate-400 border-gray-300 dark:border-slate-500 focus:ring-blue-500 dark:focus:ring-blue-500" /* Textarea style match */
                            required
                        />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full"> {/* Button default styling assumed to handle dark mode */}
                        {isLoading ? "Saving..." : "Save Entry"}
                        </Button>
                    </form>
                    </CardContent>
                </Card>

                <Card className="bg-blue-100 dark:bg-slate-700 p-4"> {/* Inner card style match */}
                    <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl text-gray-800 dark:text-slate-100">Archive</CardTitle> {/* Title text color match */}
                    </CardHeader>
                    <CardContent className="p-0">
                    {isLoading && entries.length === 0 && <p className="text-gray-700 dark:text-slate-300">Loading entries...</p>} {/* Text color match */}
                    {!isLoading && !error && entries.length === 0 && <p className="text-gray-700 dark:text-slate-300">No entries found. Create one!</p>} {/* Text color match */}
                    {entries.length > 0 && (
                        <ul className="space-y-3">
                        {entries.map((entry) => (
                            <li key={entry.id} className="p-3 bg-white dark:bg-slate-600 rounded-md shadow"> {/* List item bg match */}
                            <div className="flex justify-between items-start">
                                <div>
                                <h4 className="font-semibold text-lg text-gray-800 dark:text-slate-100">{entry.title}</h4> {/* Entry title text color match */}
                                <p className="text-sm text-gray-600 dark:text-slate-400 whitespace-pre-wrap"> {/* Entry content preview text color match */}
                                    {entry.content.substring(0, 100)}
                                    {entry.content.length > 100 && "..."}
                                </p>
                                </div>
                                <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteEntry(entry.id)}
                                disabled={isLoading}
                                aria-label="Delete entry"
                                >
                                <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" /> {/* Icon color match */}
                                </Button>
                            </div>
                            </li>
                        ))}
                        </ul>
                    )}
                    </CardContent>
                </Card>

                <Card className="bg-blue-100 dark:bg-slate-700 p-4"> {/* Inner card style match */}
                    <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl text-gray-800 dark:text-slate-100">Journals</CardTitle> {/* Title text color match */}
                    </CardHeader>
                    <CardContent className="p-0 flex justify-center items-center h-40">
                    <div className="h-24 w-24 rounded-full border-2 border-black dark:border-slate-500 flex items-center justify-center"> {/* Border color match */}
                        <Plus className="h-12 w-12 text-gray-700 dark:text-slate-300" /> {/* Icon color match */}
                    </div>
                    </CardContent>
                </Card>
                </div>
            </CardContent>
            </Card>
        ) : (
             !error && <p className="text-gray-700 dark:text-slate-300">Checking authentication...</p> // Fallback text color match
        )}
      </main>
    </div>
  );
}