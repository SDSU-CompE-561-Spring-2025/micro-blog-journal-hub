'use client'

import { Header } from "@/components/header"
import NavBar from "@/components/Navbar"
import { InterestTags } from "@/components/interest-tags"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"

// Function to get current user from localStorage
const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
  return null
}

// Function to validate image URL
const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return Boolean(response.ok && contentType?.startsWith('image/'));
  } catch {
    return false;
  }
};

export default function CreatePost() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [text, setText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in
    const user = getCurrentUser()
    if (!user) {
      router.push('/login')
    }
  }, [router])

  if (!mounted) return null

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)
    try {
      // Convert to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImageUrl(base64String)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
      setIsUploading(false)
    }
  }

  const handleImageUrlInput = async (url: string) => {
    setImageUrl(url)
    if (url) {
      const isValid = await validateImageUrl(url)
      if (!isValid) {
        toast.error("Invalid image URL")
        setImageUrl("")
      }
    }
  }

  const handleSubmit = async () => {
    if (!text) {
      toast.error("Please enter some text")
      return
    }
    if (!selectedGenre) {
      toast.error("Please select a genre")
      return
    }

    const user = getCurrentUser()
    if (!user) {
      router.push('/login')
      return
    }

    try {
      console.log('Sending request with token:', localStorage.getItem('token'))
      const response = await fetch('http://localhost:8000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          text,
          image_url: imageUrl,
          genre: selectedGenre
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        throw new Error(errorData?.detail || 'Failed to create post')
      }

      toast.success("Post created successfully!")
      router.push('/whats-new')
    } catch (error) {
      console.error("Error creating post:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create post")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavBar />
      <main className="container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px]"
              />

              <div className="space-y-2">
                <p className="text-sm font-medium">Add an image:</p>
                <div className="flex gap-4 items-center">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-sm text-muted-foreground">or</p>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={imageUrl}
                    onChange={(e) => handleImageUrlInput(e.target.value)}
                  />
                </div>
                {imageUrl && (
                  <div className="mt-4">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Select Genre:</p>
                <InterestTags
                  selectedTags={selectedGenre ? [selectedGenre] : []}
                  onTagSelect={(tag) => setSelectedGenre(tag)}
                  className="flex flex-wrap gap-2"
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={isUploading || !text || !selectedGenre}
              >
                Create Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}