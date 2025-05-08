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
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-slate-100">Create post:</h1>

        {/* Outer Card: Light gray in light mode, darker gray (gray-800) in dark mode like WhatsNew feed content area */}
        <Card className="bg-gray-100 dark:bg-gray-800 p-4 mb-6">
          <CardContent className="p-0">
            {/* Interest section: blue-100 in light, slate-700 in dark (distinct from card background) */}
            <div className="bg-blue-100 dark:bg-slate-700 rounded-xl p-6 mb-6">
              <h3 className="text-xl mb-4 text-gray-800 dark:text-slate-100">What interest would you like to choose?</h3>
              <InterestTags />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Inner Cards: blue-100 in light, slate-700 in dark */}
              <Card className="bg-blue-100 dark:bg-slate-700 p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-100">Upload Video/photo</CardTitle>
                </CardHeader>
                {/* Content area within card: white in light, slate-600 (slightly lighter than card) in dark */}
                <CardContent className="p-0 flex justify-center items-center h-40 bg-white dark:bg-slate-600 rounded-md">
                  <ImagePlus className="h-16 w-16 text-gray-400 dark:text-slate-400" />
                </CardContent>
              </Card>

              <Card className="bg-blue-100 dark:bg-slate-700 p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-100">Entry</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Textarea: white in light, slate-600 (like upload area) in dark. Text and placeholder updated. */}
                  <Textarea
                    placeholder="Type here...."
                    className="h-40 bg-white dark:bg-slate-600 dark:text-slate-100 dark:placeholder-slate-400 border-gray-300 dark:border-slate-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                  />
                </CardContent>
              </Card>

              <Card className="bg-blue-100 dark:bg-slate-700 p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-100">Archive</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* List text: darker gray in light, lighter slate in dark */}
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-slate-300">
                    <li>Entry 1</li>
                    <li>Entry 2</li>
                    <li>Entry 3</li>
                    <li>Entry 4</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-100 dark:bg-slate-700 p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-slate-100">Explore</CardTitle>
                </CardHeader>
                <CardContent className="p-0">{/* Empty explore section */}</CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}