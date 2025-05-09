'use client'
import { Header } from "@/components/header"
import NavBar from "@/components/Navbar"
import Image from "next/image"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

export default function WhatsNew() {
  const router = useRouter()

  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [posts, setPosts] = useState([
    {
      user: "Rhilo Sotto",
      text: "I explored the vibrant jungles of Costa Rica with breathtaking waterfalls, rare wildlife, and unforgettable hikes. Completing this Bucket List journey felt surreal. Next destination... the tranquil beaches of The Bahamas!",
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      likes: 0,
      comments: [] as string[],
      genre: "Adventure",
      time: "3:42 PM"
    },
    {
      user: "John Guerrero",
      text: "A spontaneous weekend getaway turned into the best trip this year. Discovered hidden coves, tasted local cuisine, and embraced the calm. Thanks to this amazing new travel app!",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      likes: 0,
      comments: [],
      genre: "Travel",
      time: "10:17 AM"
    },
    {
      user: "Maria Chen",
      text: "Months of persistence and training paid off—crossing that marathon finish line was a life-changing experience! Nothing beats the energy of the crowd and the pride of reaching your goal.",
      image: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg",
      likes: 0,
      comments: [],
      genre: "Fitness",
      time: "7:53 PM"
    },
    {
      user: "Alex Rodriguez",
      text: "After countless trials, I finally perfected the soufflé. Fluffy, golden, and light as air—turns out, the secret really is in the egg whites. Cooking is truly an art form!",
      image: "https://images.pexels.com/photos/4252136/pexels-photo-4252136.jpeg",
      likes: 0,
      comments: [],
      genre: "Cooking",
      time: "12:05 PM"
    }
  ])

  const handleLike = (index: number) => {
    const updated = [...posts]
    const liked = new Set(likedPosts)
    if (liked.has(index)) {
      updated[index].likes -= 1
      liked.delete(index)
    } else {
      updated[index].likes += 1
      liked.add(index)
    }
    setPosts(updated)
    setLikedPosts(liked)
  }

  const handleComment = (index: number, comment: string) => {
    if (!comment.trim()) return
    const updated = [...posts]
    updated[index].comments.push(comment)
    setPosts(updated)
  }

  return (
    <main className="min-h-screen bg-[#F7F7F7] dark:bg-slate-900">
      <Header />
      {/* NavBar is rendered directly. Its own styles will make it full-width.
          Padding for NavBar items is handled within NavBar.tsx for alignment with page content. */}
      <NavBar />

      <div className="p-6"> {/* This p-6 sets the padding for the main content area */}
        <div className="max-w-[1400px] mx-auto">
          {/* What's New Feed */}
          <div className="bg-purple-500 dark:bg-purple-700 rounded-t-2xl border border-black dark:border-gray-700 overflow-hidden">
            <div className="p-3 border-b border-black dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-white font-inter text-lg">What's New Feed</h2>
              <div className="text-sm text-blue-300 dark:text-blue-400 italic flex-grow text-right px-4 whitespace-nowrap overflow-hidden text-ellipsis">
                Explore: Adventure | Travel | Fitness | Cooking | Gaming | Photography | Nature | Technology | Wellness | Art | Food | Hiking | Reading
              </div>
            </div>
            <div className="bg-[#D9D9D9] dark:bg-gray-800 border-t border-black dark:border-gray-700 p-4 space-y-4">
              {posts.map((post, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-md border border-black dark:border-gray-600 flex flex-col gap-2 bg-white dark:bg-gray-700 dark:text-gray-100`}
                >
                  <div className="flex gap-4">
                    <div className="w-64 h-40 flex-shrink-0 border border-black dark:border-gray-600 rounded-md overflow-hidden">
                      <Image src={post.image} alt={`${post.user} image`} width={256} height={160} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-semibold mb-1">{post.user}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{post.text}</p>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-right">Posted at {post.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <button onClick={() => handleLike(idx)} className="text-sm text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                      👍 {post.likes}
                    </button>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        const commentInput = e.currentTarget.elements.namedItem("comment") as HTMLInputElement
                        if (!commentInput.value.trim()) return
                        handleComment(idx, commentInput.value)
                        commentInput.value = ""
                      }}
                      className="flex flex-grow items-center gap-2"
                    >
                      <input 
                        name="comment" 
                        placeholder="Add a comment..." 
                        className="flex-grow px-2 py-1 text-sm border border-gray-400 rounded bg-gray-100 
                                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400" 
                      />
                      <button type="submit" className="text-sm text-green-700 hover:underline dark:text-green-400 dark:hover:text-green-300">Post</button>
                    </form>
                  </div>
                  {post.comments.length > 0 && (
                    <div className="ml-4 mt-2 space-y-1 text-sm text-gray-800 dark:text-gray-300">
                      {post.comments.map((c, i) => (
                        <div key={i}>💬 {c}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}