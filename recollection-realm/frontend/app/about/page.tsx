import { Header } from "@/components/header"
import NavBar from "@/components/Navbar"
import { InterestTags } from "@/components/interest-tags"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function CreatePostPage() {
  return (
    // Page background: Consistent with WhatsNew
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <NavBar />

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {/* Main heading: Brighter text for dark mode */}
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-slate-100">About us:</h1>

        {/* Outer Card: Light gray in light mode, darker gray (gray-800) in dark mode like WhatsNew feed content area */}
        <Card className="bg-gray-100 dark:bg-gray-800 p-4 mb-6">
          <CardContent className="p-0">
            {/* Interest section: blue-100 in light, slate-700 in dark (distinct from card background) */}
            <div className="bg-blue-100 dark:bg-slate-700 rounded-xl p-6 mb-6">
              <h3 className="text-xl mb-4 text-gray-800 dark:text-slate-100">
  Welcome to Recollection Realm – Your Personal Space to Write, Reflect, and Share!<br /> </h3>
<div className="text-xl mb-6 space-y-4 text-gray-800 dark:text-slate-100">
  <p>
    Recollection Realm is a simple, powerful platform designed for anyone who wants to journal privately or share their thoughts with the world.
  </p>
  <p>
    Whether you're looking to document daily life, explore creative writing, or publish thoughtful blog posts, our tools make it easy to write, organize, and revisit your entries.
  </p>
  <p>
    Start a private journal, publish public blogs, or do both — it's your space, your way.
  </p>
  <p>
    Recollection Realm helps you focus on what matters most: your words.
  </p>
</div>

            </div>
            
            
          </CardContent>
        </Card>
      </main>
    </div>
  )
}