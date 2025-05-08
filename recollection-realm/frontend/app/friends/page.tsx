import { Header } from "@/components/header"
import { FriendsList } from "@/components/friends-list" // Assume this component handles its own dark mode or inherits text color
import { FriendPost } from "@/components/friend-post"   // Assume this component handles its own dark mode or inherits text color
import NavBar from "@/components/Navbar"

export default function FriendsPage() {
  return (
    // Page background: Consistent with other pages
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <NavBar />

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {/* 
          The FriendsList component would ideally handle its own dark mode styling.
          For example, its background might become dark:bg-gray-800 and its text dark:text-slate-200/300.
        */}
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

        {/* Main heading: Brighter text for dark mode */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-slate-100">
          Friends Posts
        </h2>

        {/* 
          The FriendPost component would ideally handle its own dark mode styling.
          For example, its background might become dark:bg-gray-800, 
          author/content text dark:text-slate-200/300, and date text dark:text-slate-400.
        */}
        <div className="space-y-6">
          <FriendPost
            author="Tarun Nair"
            content="Been meaning to try out this new food spot.Wanted to share with yall some good eats! Check it out :D"
            date="3/16/25 at 5:45 pm"
            imageUrl="/placeholder.svg?height=300&width=400" // Placeholder image, styling for actual images might need consideration for dark mode overlays if needed
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