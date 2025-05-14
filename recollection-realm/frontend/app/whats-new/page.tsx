'use client'
import { Header } from "@/components/header"
import NavBar from "@/components/Navbar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

interface Post {
  id: number
  text: string
  image_url: string | null
  genre: string
  likes: number
  created_at: string
  username: string
  comments: Comment[]
}

interface Comment {
  id: number
  text: string
  created_at: string
  user_id: number
}

export default function WhatsNew() {
  const [posts, setPosts] = useState<Post[]>([])
  const [mounted, setMounted] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast.error("Failed to fetch posts")
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchPosts()
  }, [])

  if (!mounted) return null

  const handleLike = async (postId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to like post')
      }

      const updatedPost = await response.json()
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, likes: updatedPost.likes } : post
      ))
      setLikedPosts(new Set([...likedPosts, postId]))
    } catch (error) {
      console.error("Error liking post:", error)
      toast.error("Failed to like post")
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavBar />
      <main className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.username}`} />
                    <AvatarFallback>{getInitials(post.username)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{post.username}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(post.created_at), 'MMM d, yyyy')} • {post.genre}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {post.image_url && (
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={post.image_url}
                      alt="Post image"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-base leading-relaxed mb-4">{post.text}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2"
                        onClick={() => handleLike(post.id)}
                        disabled={likedPosts.has(post.id)}
                      >
                        <Heart
                          className={`h-5 w-5 ${likedPosts.has(post.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-muted-foreground'
                            }`}
                        />
                        <span>{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                        <span>{post.comments.length}</span>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Share2 className="h-5 w-5 text-muted-foreground" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}