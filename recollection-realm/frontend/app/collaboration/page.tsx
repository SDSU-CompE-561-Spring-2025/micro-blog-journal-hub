"use client"; // Required for Next.js App Router with client-side hooks

import { Header } from "@/components/header";
import NavBar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Added
import { Button } from "@/components/ui/button"; // Added
import { Plus, Trash2 } from "lucide-react"; // Added Trash2 for delete icon
import { useState, useEffect, FormEvent } from "react"; // Added React hooks

// Define the base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Frontend interface matching backend's EntryOut schema
interface Entry {
  id: number;
  title: string;
  content: string;
  user_id: number; // Assuming user.id is number. Adjust if it's string (e.g. UUID)
  // Add other fields like created_at, updated_at if they are part of EntryOut
  // created_at?: string;
  // updated_at?: string;
}

// Helper to get auth token (replace with your actual auth logic)
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch entries for the current user
  const fetchEntries = async () => {
    setIsLoading(true);
    setError(null);
    const token = getAuthToken();
    if (!token) {
      setError("Authentication token not found. Please log in.");
      setIsLoading(false);
      // Optionally, redirect to login page
      // router.push('/login');
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
      setError("Authentication token not found. Please log in.");
      setIsLoading(false);
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
          throw new Error("Unauthorized or Access Denied creating entry.");
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error creating entry: ${response.statusText}`);
      }
      // const newEntry: Entry = await response.json(); // Backend returns the created entry
      // setEntries([newEntry, ...entries]); // Add to list locally or refetch
      setNewEntryTitle("");
      setNewEntryContent("");
      fetchEntries(); // Refetch all entries to include the new one
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an entry
  const handleDeleteEntry = async (entryId: number) => {
    setIsLoading(true); // Can use a more specific loading state if needed
    setError(null);
    const token = getAuthToken();
    if (!token) {
      setError("Authentication token not found. Please log in.");
      setIsLoading(false);
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
          throw new Error("Unauthorized or Access Denied deleting entry.");
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error deleting entry: ${response.statusText}`);
      }
      // const result = await response.json(); // { "success": true }
      // if (result.success) {
      //   setEntries(entries.filter((entry) => entry.id !== entryId));
      // }
      fetchEntries(); // Refetch all entries after deletion
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch entries when the component mounts
  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <NavBar />
      
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Collaboration</h1>

        {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}

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

              {/* Entry Creation Card - Modified */}
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
                        className="h-32 bg-white" // Adjusted height
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? "Saving..." : "Save Entry"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Archive Card - Modified to display fetched entries */}
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

              {/* Journals Card - Remains static for now */}
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
      </main>
    </div>
  );
}