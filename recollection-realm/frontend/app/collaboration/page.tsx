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
      setIsLoading(false); // This might be called before fetchEntries finishes if it's awaited
                          // Consider managing loading state more granularly or ensure fetchEntries sets it.
                          // For now, fetchEntries will set it correctly on its completion.
    }
  };

  // Delete an entry
  const handleDeleteEntry = async (entryId: number) => {
    // Consider a specific loading state for delete if desired, e.g., `isDeleting[entryId] = true`
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
      setIsLoading(false); // Set loading to false before redirecting
      handleUnauthorized("You must be logged in to view this page.");
    } else {
      fetchEntries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    // Adding router to dependency array can cause infinite loops if not handled carefully
    // Typically, you don't need router in deps for this kind of initial load check.
    // handleUnauthorized is stable if defined outside or memoized.
  }, []); // Run once on mount


  // If loading and no token was found (and thus redirect initiated), don't render the page content
  // Or if there's an error that's an auth error and redirect is happening.
  // This check is a bit tricky as redirect happens async.
  // The `useEffect` handles initial redirect.
  // For subsequent API calls, the page might briefly show before redirect.
  // A global auth context would be better for immediate redirects.

  if (isLoading && !entries.length) {
    // Show a generic loading screen if we are still loading initially
    // and haven't been redirected yet (e.g., token exists but fetch is pending)
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <NavBar />
            <main className="flex-1 p-4 max-w-4xl mx-auto w-full flex justify-center items-center">
                <p className="text-xl">Loading collaboration data...</p>
            </main>
        </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <NavBar />
      
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Collaboration</h1>

        {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}

        {/* Only render main content if not loading and no critical auth error causing redirect */}
        {/* The redirect should handle the view, but this is a fallback */}
        {!isLoading || entries.length > 0 ? (
            <Card className="bg-gray-200 p-4 mb-6">
            <CardContent className="p-0">
                {/* Static content remains as is */}
                <div className="bg-blue-100 rounded-xl p-6 mb-6">
                <h3 className="text-xl mb-4">Which Journal are we working on today!</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-6 space-y-1">
                    <li>Sunny San Diego</li>
                    <li>Visit to the beach</li>
                    <li>Friends in Cornado</li>
                    </ul>
                    <ul className="list-disc pl-6 space-y-1">
                    <li>Cars & Coffee</li>
                    <li>Code 101</li>
                    <li>Thoughts I think of</li>
                    </ul>
                </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-100 p-4">
                    <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">Add friends:</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Friend 1</li>
                        <li>Friend 2</li>
                        <li>Friend 3</li>
                    </ul>
                    </CardContent>
                </Card>

                {/* Entry Creation Card */}
                <Card className="bg-blue-100 p-4">
                    <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">Create New Entry</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                    <form onSubmit={handleCreateEntry} className="space-y-4">
                        <div>
                        <label htmlFor="entryTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <Input
                            id="entryTitle"
                            type="text"
                            placeholder="Entry title"
                            value={newEntryTitle}
                            onChange={(e) => setNewEntryTitle(e.target.value)}
                            className="bg-white"
                            required
                        />
                        </div>
                        <div>
                        <label htmlFor="entryContent" className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <Textarea
                            id="entryContent"
                            placeholder="Type your journal entry here...."
                            value={newEntryContent}
                            onChange={(e) => setNewEntryContent(e.target.value)}
                            className="h-32 bg-white"
                            required
                        />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? "Saving..." : "Save Entry"}
                        </Button>
                    </form>
                    </CardContent>
                </Card>

                {/* Archive Card */}
                <Card className="bg-blue-100 p-4">
                    <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">Archive</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                    {isLoading && entries.length === 0 && <p>Loading entries...</p>}
                    {!isLoading && !error && entries.length === 0 && <p>No entries found. Create one!</p>}
                    {entries.length > 0 && (
                        <ul className="space-y-3">
                        {entries.map((entry) => (
                            <li key={entry.id} className="p-3 bg-white rounded-md shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                <h4 className="font-semibold text-lg">{entry.title}</h4>
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">
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
                                <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                            </li>
                        ))}
                        </ul>
                    )}
                    </CardContent>
                </Card>

                {/* Journals Card */}
                <Card className="bg-blue-100 p-4">
                    <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">Journals</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex justify-center items-center h-40">
                    <div className="h-24 w-24 rounded-full border-2 border-black flex items-center justify-center">
                        <Plus className="h-12 w-12" />
                    </div>
                    </CardContent>
                </Card>
                </div>
            </CardContent>
            </Card>
        ) : (
            // This part is mainly for when initial loading is true, or error indicates no content should be shown
            // If redirection is happening, this might show briefly or not at all.
            // The loading screen above is more specific for initial load.
            <p>{error ? "" : "Checking authentication..."}</p>
        )}
      </main>
    </div>
  );
}