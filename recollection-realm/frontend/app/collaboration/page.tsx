"use client"; // Required for Next.js App Router with client-side hooks

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

// Frontend interface matching backend's schema
interface Entry {
  id: number;
  text: string;  // Changed from content to text
  user_id: number;
  username: string;
  image_url: string;
  genre: string;
  likes: number;
  created_at: string;
  comments: any[];
}

// Helper to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    // Check for both token keys for backward compatibility
    return localStorage.getItem("token") || localStorage.getItem("authToken");
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
      const response = await fetch(`${API_BASE_URL}/api/posts/`, {
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
      const response = await fetch(`${API_BASE_URL}/api/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newEntryContent }), // Changed from content to text
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
      const response = await fetch(`${API_BASE_URL}/api/posts/${entryId}`, {
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

      <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-slate-100 text-center">Collaboration</h1>

        {error && (
          <p className="text-red-600 bg-red-100 p-3 rounded-lg mb-4 dark:text-red-400 dark:bg-red-900/30 text-center">
            {error}
          </p>
        )}

        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 mb-6 dark:from-slate-800 dark:to-slate-700 shadow-lg rounded-xl">
          <CardContent className="p-0">
            {/* Static content section */}
            <div className="bg-white/80 rounded-xl p-6 mb-6 dark:bg-slate-700/50 shadow-inner">
              <h3 className="text-2xl mb-4 text-gray-800 dark:text-slate-200 font-semibold">Which Journal are we working on today!</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-slate-300">
                <ul className="list-none space-y-2">
                  <li className="flex items-center space-x-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span>Sunny San Diego</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span>Visit to the beach</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span>Friends in Cornado</span>
                  </li>
                </ul>
                <ul className="list-none space-y-2">
                  <li className="flex items-center space-x-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span>Cars & Coffee</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span>Code 101</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span>Thoughts I think of</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Add Friends Card */}
              <Card className="bg-white/80 p-6 dark:bg-slate-700/50 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-200">Add friends</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    {["Friend 1", "Friend 2", "Friend 3"].map((friend, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600/50 transition-colors">
                        <span className="text-gray-700 dark:text-slate-300">{friend}</span>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Entry Creation Card */}
              <Card className="bg-white/80 p-6 dark:bg-slate-700/50 shadow-md hover:shadow-lg transition-shadow">
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
                        className="bg-white/50 text-gray-700 dark:bg-slate-600/50 dark:text-gray-300 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 border-gray-200 dark:border-slate-600"
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
                        className="h-32 bg-white/50 text-gray-700 dark:bg-slate-600/50 dark:text-gray-300 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 border-gray-200 dark:border-slate-600 resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      {isLoading ? "Saving..." : "Save Entry"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Archive Card */}
              <Card className="bg-white/80 p-6 dark:bg-slate-700/50 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-200">Archive</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoading && entries.length === 0 && (
                    <p className="text-gray-600 dark:text-slate-400 text-center py-4">Loading entries...</p>
                  )}
                  {!isLoading && !error && entries.length === 0 && (
                    <p className="text-gray-600 dark:text-slate-400 text-center py-4">No entries found. Create one!</p>
                  )}
                  {entries.length > 0 && (
                    <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {entries.map((entry) => (
                        <li key={entry.id} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-slate-600 border border-gray-100 dark:border-slate-500">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg text-gray-800 dark:text-slate-100">{entry.username}</h4>
                              <p className="text-sm text-gray-600 dark:text-slate-400 whitespace-pre-wrap">
                                {entry.text?.substring(0, 100) || ''}
                                {entry.text && entry.text.length > 100 && "..."}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteEntry(entry.id)}
                              disabled={isLoading}
                              aria-label="Delete entry"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Journals Card */}
              <Card className="bg-white/80 p-6 dark:bg-slate-700/50 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-200">Journals</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex justify-center items-center h-40">
                  <div className="h-24 w-24 rounded-full border-2 border-purple-500 dark:border-purple-400 flex items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors cursor-pointer group">
                    <Plus className="h-12 w-12 text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform" />
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