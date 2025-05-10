"use client";

import { Header } from "@/components/header";
import NavBar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";

// Define the base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
    // Consistent with header.tsx, assuming token key is "token"
    // If your auth system uses "authToken", revert this change.
    // For this exercise, I'm assuming "token" based on header.tsx for login check.
    // However, the original page.tsx used "authToken", so let's stick to that to avoid breaking existing logic.
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
      setNewEntryTitle("");
      setNewEntryContent("");
      fetchEntries();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an entry
  const handleDeleteEntry = async (entryId: number) => {
    setIsLoading(true);
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
      fetchEntries();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    // Page background: Consistent with FriendsPage
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <NavBar />
      
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {/* Main heading: Brighter text for dark mode */}
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-slate-100">Collaboration</h1>

        {/* Error Message: Dark mode styling */}
        {error && (
          <p className="text-red-600 bg-red-100 p-3 rounded mb-4 dark:text-red-400 dark:bg-red-900/30">
            {error}
          </p>
        )}

        {/* Main content card: Dark mode background */}
        <Card className="bg-gray-200 p-4 mb-6 dark:bg-slate-800">
          <CardContent className="p-0">
            {/* Static content section */}
            <div className="bg-blue-100 rounded-xl p-6 mb-6 dark:bg-slate-700">
              <h3 className="text-xl mb-4 text-gray-800 dark:text-slate-200">Which Journal are we working on today!</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-slate-300">
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
              {/* Add Friends Card */}
              <Card className="bg-blue-100 p-4 dark:bg-slate-700">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-200">Add friends:</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-gray-700 dark:text-slate-300">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Friend 1</li>
                    <li>Friend 2</li>
                    <li>Friend 3</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Entry Creation Card */}
              <Card className="bg-blue-100 p-4 dark:bg-slate-700">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-200">Create New Entry</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <form onSubmit={handleCreateEntry} className="space-y-4">
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
                        // Consistent input styling with header
                        className="bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#8F41D3] dark:focus:ring-violet-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="entryContent" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Content
                      </label>
                      <Textarea
                        id="entryContent"
                        placeholder="Type your journal entry here...."
                        value={newEntryContent}
                        onChange={(e) => setNewEntryContent(e.target.value)}
                        // Consistent textarea styling
                        className="h-32 bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#8F41D3] dark:focus:ring-violet-500"
                        required
                      />
                    </div>
                    {/* Button should adapt via its own UI component styles, but can be overridden */}
                    <Button type="submit" disabled={isLoading} className="w-full bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                      {isLoading ? "Saving..." : "Save Entry"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Archive Card */}
              <Card className="bg-blue-100 p-4 dark:bg-slate-700">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-200">Archive</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoading && entries.length === 0 && <p className="text-gray-600 dark:text-slate-400">Loading entries...</p>}
                  {!isLoading && !error && entries.length === 0 && <p className="text-gray-600 dark:text-slate-400">No entries found. Create one!</p>}
                  {entries.length > 0 && (
                    <ul className="space-y-3">
                      {entries.map((entry) => (
                        <li key={entry.id} className="p-3 bg-white rounded-md shadow dark:bg-slate-600">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg text-gray-800 dark:text-slate-100">{entry.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-slate-400 whitespace-pre-wrap">
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
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500" // Explicit color for icon container
                            >
                              <Trash2 className="h-4 w-4" /> {/* Icon inherits color from button text color */}
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Journals Card */}
              <Card className="bg-blue-100 p-4 dark:bg-slate-700">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-200">Journals</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex justify-center items-center h-40">
                  <div className="h-24 w-24 rounded-full border-2 border-black dark:border-slate-500 flex items-center justify-center">
                    <Plus className="h-12 w-12 text-black dark:text-slate-300" />
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