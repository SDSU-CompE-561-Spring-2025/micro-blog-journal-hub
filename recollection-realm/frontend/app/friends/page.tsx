import { Header } from "@/components/header"
import { FriendsList } from "@/components/friends-list"
import { FriendPost } from "@/components/friend-post"
import NavBar from "@/components/Navbar"

export default function FriendsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <NavBar />

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <FriendsList
            title="Your Friends :"
            friends={["Tarun Nair", "Friend 2", "Friend 3", "Friend 4", "Friend 5", "Friend 6"]}
          />

          <FriendsList
            title="Suggested:"
            friends={["Ugur", "Tri Bui", "Friend 3", "Friend 4", "Friend 5", "Friend 6"]}
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Friends Posts</h2>

        <div className="space-y-6">
          <FriendPost
            author="Tarun Nair"
            content="Been meaning to try out this new food spot.Wanted to share with yall some good eats! Check it out :D"
            date="3/16/25 at 5:45 pm"
            imageUrl="/placeholder.svg?height=300&width=400"
          />

          <FriendPost
            author="Friend 2"
            content="Wanted to check out the beach for the first time in a while. I haven't gone surfing since I had that shark incident.... But I'm glad im back and ready to get at it!"
            imageUrl="/placeholder.svg?height=300&width=400"
          />
        </div>
      </main>
    </div>
  )
}
