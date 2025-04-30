import { Header } from "@/components/header"
import { InterestTags } from "@/components/interest-tags"
import { PostCard } from "@/components/post-card"

export default function FeedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="mb-6 bg-purple-400 rounded-full py-2 px-4 text-white">
          <h2 className="text-lg">Welcome Wilson to What&apos;s New,</h2>
        </div>

        <div className="mb-8 bg-purple-400 rounded-2xl p-6">
          <h3 className="text-xl text-white mb-4">What are your interests?</h3>
          <InterestTags />
        </div>

        <div className="mb-6 bg-purple-400 rounded-full py-2 px-4 text-white">
          <h2 className="text-lg">Explore posts from around the world!</h2>
        </div>

        <div className="space-y-6">
          <PostCard
            author="Rhilo Sotto"
            content="I explored the jungles of Costa Rica and finally got to complete one of my Bucket List Explorations. Next stop... The Bahamas!"
            signature="-Rhilo, over and out"
            date="3/16/25 at 5:03pm"
            imageUrl="/placeholder.svg?height=400&width=600"
          />

          <PostCard
            author="John Guerrero"
            content="It's been too long since I've enjoyed a nice clear weekend getaway. We tried out this new app to book our dream vacation spot and let me tell"
            imageUrl="/placeholder.svg?height=400&width=600"
          />
        </div>
      </main>
    </div>
  )
}
