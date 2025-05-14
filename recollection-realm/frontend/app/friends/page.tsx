'use client'

import { Header } from "@/components/header"
import NavBar from "@/components/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, MessageCircle, Heart, Share2 } from "lucide-react"
import { useState } from "react"

// Mock data for friends and suggested friends
const friendsData = [
  { id: 1, name: "Tarun Nair", avatar: "TN" },
  { id: 2, name: "Friend 2", avatar: "F2" },
  { id: 3, name: "Friend 3", avatar: "F3" },
  { id: 4, name: "Friend 4", avatar: "F4" },
  { id: 5, name: "Friend 5", avatar: "F5" },
  { id: 6, name: "Friend 6", avatar: "F6" },
]

const suggestedFriends = [
  { id: 7, name: "Ugur", avatar: "UG", mutualFriends: 3 },
  { id: 8, name: "Tri Bui", avatar: "TB", mutualFriends: 2 },
  { id: 9, name: "Friend 3", avatar: "F3", mutualFriends: 1 },
  { id: 10, name: "Friend 4", avatar: "F4", mutualFriends: 4 },
  { id: 11, name: "Friend 5", avatar: "F5", mutualFriends: 2 },
  { id: 12, name: "Friend 6", avatar: "F6", mutualFriends: 1 },
]

export default function FriendsPage() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <NavBar />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[350px_1fr] gap-6">
          {/* Friends Lists Section */}
          <div className="space-y-6">
            {/* Your Friends Card */}
            <Card className="bg-white dark:bg-slate-800 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                  Your Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {friendsData.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${friend.name}`} />
                          <AvatarFallback>{friend.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-slate-100">{friend.name}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Friends Card */}
            <Card className="bg-white dark:bg-slate-800 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                  Suggested Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${friend.name}`} />
                          <AvatarFallback>{friend.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-slate-100">{friend.name}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">
                            {friend.mutualFriends} mutual friends
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <UserPlus className="h-4 w-4 text-purple-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Friends Posts Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              Friends Posts
            </h2>

            <div className="space-y-6">
              {/* Example posts with modern styling */}
              <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Tarun%20Nair" />
                      <AvatarFallback>TN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-slate-100">Tarun Nair</h3>
                      <p className="text-sm text-gray-500 dark:text-slate-400">3/16/25 at 5:45 pm</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 mb-4">
                    Been meaning to try out this new food spot. Wanted to share with yall some good eats! Check it out :D
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleLike(1)}
                    >
                      <Heart className={`h-5 w-5 ${likedPosts.has(1) ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-slate-400'}`} />
                      <span className="text-gray-600 dark:text-slate-300">24</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                      <span className="text-gray-600 dark:text-slate-300">12</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                      <span className="text-gray-600 dark:text-slate-300">Share</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Friend%202" />
                      <AvatarFallback>F2</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-slate-100">Friend 2</h3>
                      <p className="text-sm text-gray-500 dark:text-slate-400">3/16/25 at 4:30 pm</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 mb-4">
                    Wanted to check out the beach for the first time in a while. I haven't gone surfing since I had that shark incident.... But I'm glad im back and ready to get at it!
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleLike(2)}
                    >
                      <Heart className={`h-5 w-5 ${likedPosts.has(2) ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-slate-400'}`} />
                      <span className="text-gray-600 dark:text-slate-300">18</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                      <span className="text-gray-600 dark:text-slate-300">8</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                      <span className="text-gray-600 dark:text-slate-300">Share</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}