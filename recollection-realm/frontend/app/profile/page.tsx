import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react"
import NavBar from "@/components/Navbar"

export default function ProfilePage() {
  return (
    // Page background: Consistent with other pages
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <NavBar />

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex flex-col items-center">
            {/* Profile icon container: Lighter gray in light, darker gray in dark */}
            <div className="bg-gray-200 dark:bg-slate-700 rounded-full h-48 w-48 flex items-center justify-center mb-4">
              {/* Profile icon color: Black in light, white/lighter in dark */}
              <UserCircle className="h-32 w-32 text-black dark:text-slate-200" />
            </div>
            {/* Name display: Assuming purple is an accent color that remains consistent */}
            <div className="bg-purple-400 rounded-full py-2 px-6 text-white flex items-center justify-between w-full max-w-xs">
              <span className="font-medium">Name: John Guerrero</span>
              <Button variant="link" className="text-white p-0 h-auto">
                edit
              </Button>
            </div>
          </div>

          {/* Description Card: Assuming purple background and white text are intentional accents */}
          <Card className="flex-1 bg-purple-400 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-medium">Description</h2>
                <Button variant="link" className="text-white p-0 h-auto">
                  edit
                </Button>
              </div>
              <p className="mb-4">
                Wassup wit it. John here, I like long walks on the beach, playing Pokemon Pocket TCG, and napping.
                Computer Engineer at SDSU. Make sure to like, comment, and repost my adventures and excursions and
                let's enjoy the ride!
              </p>
              <p>-John, over and out</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-[200px_1fr] gap-6">
          {/* Settings List Card: Assuming gradient and text color are intentional accents */}
          <Card className="bg-gradient-to-b from-purple-400 to-blue-400 text-white h-fit">
            <CardContent className="p-4">
              <ul className="space-y-4">
                <li>Account</li>
                <li>Privacy</li>
                <li>Notifications</li>
                <li>Sign in & Security</li>
                <li>Inheritance</li>
                <li>...</li>
              </ul>
            </CardContent>
          </Card>

          {/* Tab Content Card: Assuming purple background and white text are intentional accents */}
          <Card className="bg-purple-400 text-white">
            <CardContent className="p-4">
              <h3 className="text-xl mb-4 border-b pb-2">Name of tab selected...</h3>
              <div className="h-64">{/* Content for the selected tab would go here */}</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}