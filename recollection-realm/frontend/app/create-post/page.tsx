"use client"; // Add this for client-side interactivity (useState, useEffect, event handlers)

import { Header } from "@/components/header";
import NavBar from "@/components/Navbar";
import InterestTags from "@/components/interest-tags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // For the submit button
import { Input } from "@/components/ui/input"; // For file input
import { Label } from "@/components/ui/label"; // For file input label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // For journal selection
import { ImagePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast"; // For user feedback

// Define a type for Journals fetched from the backend
interface Journal {
  id: number;
  title: string;
  // Add other journal properties if needed
}

// Define a type for Entries in the Archive
interface ArchivedEntry {
  id: number;
  title?: string;
  content: string;
  created_at: string; // Assuming date is a string
}

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [journals, setJournals] = useState<Journal[]>([]);
  const [selectedJournalId, setSelectedJournalId] = useState<string>(""); // Store as string for Select component
  const [archivedEntries, setArchivedEntries] = useState<ArchivedEntry[]>([]);

  // Fetch user's journals for the dropdown
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        // IMPORTANT: Replace with your actual auth token retrieval logic
        const token = localStorage.getItem("accessToken"); // Example
        if (!token) {
          toast({ title: "Authentication Error", description: "Please log in.", variant: "destructive" });
          return;
        }

        const response = await fetch("/api/journals/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch journals");
        }
        const data: Journal[] = await response.json();
        setJournals(data);
        if (data.length > 0) {
          setSelectedJournalId(data[0].id.toString()); // Default to first journal
        }
      } catch (error) {
        console.error("Error fetching journals:", error);
        toast({ title: "Error", description: "Could not load your journals.", variant: "destructive" });
      }
    };

    fetchJournals();
  }, [toast]);

  // Fetch archived entries (user's entries)
  useEffect(() => {
    const fetchArchivedEntries = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const response = await fetch("/api/entries/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch entries");
        }
        const data: ArchivedEntry[] = await response.json();
        setArchivedEntries(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4)); // Get latest 4
      } catch (error) {
        console.error("Error fetching archived entries:", error);
        // toast({ title: "Error", description: "Could not load archive.", variant: "destructive" });
      }
    };
    fetchArchivedEntries();
  }, [toast]);


  const handleTagsChange = ({ tags }: { tags: string[] }) => {
    setSelectedTags(tags);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setMediaFile(event.target.files[0]);
    } else {
      setMediaFile(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!content.trim()) {
      toast({ title: "Validation Error", description: "Entry content cannot be empty.", variant: "destructive" });
      return;
    }
    if (!selectedJournalId) {
      toast({ title: "Validation Error", description: "Please select a journal.", variant: "destructive" });
      return;
    }
    setIsLoading(true);

    // --- Placeholder for actual file upload ---
    // In a real app, you'd upload the file to a service (e.g., S3, or a dedicated backend endpoint)
    // and get a URL back. For now, we'll just simulate this or skip it.
    let mediaUrl: string | undefined = undefined;
    if (mediaFile) {
      // Example: You'd have an upload function here
      // mediaUrl = await uploadFileAndGetUrl(mediaFile);
      // For this example, we'll just use the file name as a placeholder.
      // This won't actually work for displaying an image unless your backend serves it.
      // mediaUrl = `/uploads/${mediaFile.name}`; // This is NOT a real upload
      toast({ title: "Info", description: "File upload is a placeholder. Actual upload logic needed." });
      // For testing,  can set a dummy URL if your backend accepts it.
      // mediaUrl = "https://example.com/path/to/your/image.jpg";
    }
    // --- End placeholder ---

    const entryData = {
      content: content,
      tags: selectedTags.map(tag => tag),
      media_url: mediaUrl,
      journal_id: parseInt(selectedJournalId),
      // title: "Optional Title Here" // You can add a title field if needed
    };

    try {
      // IMPORTANT: Replace with your actual auth token retrieval logic
      const token = localStorage.getItem("accessToken"); // Example
      if (!token) {
        toast({ title: "Authentication Error", description: "Please log in to create a post.", variant: "destructive" });
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/entries/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create post");
      }

      // const newEntry = await response.json(); // You can use this if needed
      toast({ title: "Success!", description: "Your post has been created." });
      setContent("");
      setSelectedTags([]);
      setMediaFile(null);
      // Optionally, refresh archived entries
      // fetchArchivedEntries();
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error creating post",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <NavBar />

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Create post:</h1>

        <form onSubmit={handleSubmit}>
          <Card className="bg-gray-200 p-4 mb-6">
            <CardContent className="p-0 space-y-6">
              {/* Journal Selector */}
              <div className="bg-blue-100 rounded-xl p-6">
                <h3 className="text-xl mb-4">Choose Journal:</h3>
                <Select value={selectedJournalId} onValueChange={setSelectedJournalId}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select a journal" />
                  </SelectTrigger>
                  <SelectContent>
                    {journals.length > 0 ? (
                      journals.map((journal) => (
                        <SelectItem key={journal.id} value={journal.id.toString()}>
                          {journal.title || `Journal ${journal.id}`}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="disabled" disabled>No journals found. Create one first!</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-100 rounded-xl p-6">
                <h3 className="text-xl mb-4">What interest would you like to choose?</h3>
                {/* Ensure InterestTags component calls onTagsChange with selected tags */}
                <InterestTags onTagsChange={handleTagsChange} initialTags={selectedTags} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-100 p-4">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">Upload Video/photo (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex flex-col justify-center items-center h-40 bg-white rounded-md">
                    {mediaFile ? (
                      <p className="text-sm text-gray-700">{mediaFile.name}</p>
                    ) : (
                      <ImagePlus className="h-16 w-16 text-gray-400" />
                    )}
                    <Label htmlFor="media-upload" className="mt-2 text-blue-600 cursor-pointer hover:underline">
                      {mediaFile ? "Change file" : "Select file"}
                    </Label>
                    <Input id="media-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*,video/*" />
                  </CardContent>
                </Card>

                <Card className="bg-blue-100 p-4">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">Entry</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Textarea
                      placeholder="Type here...."
                      className="h-40 bg-white"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </CardContent>
                </Card>

                <Card className="bg-blue-100 p-4">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">Archive (Recent Entries)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {archivedEntries.length > 0 ? (
                      <ul className="list-disc pl-6 space-y-1">
                        {archivedEntries.map(entry => (
                           <li key={entry.id} title={entry.content.substring(0, 100) + "..."}>
                             {entry.title || `Entry on ${new Date(entry.created_at).toLocaleDateString()}`}
                           </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No entries yet.</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-blue-100 p-4">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">Explore</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-500">Explore functionality coming soon.</p>
                  </CardContent>
                </Card>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Post"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}

