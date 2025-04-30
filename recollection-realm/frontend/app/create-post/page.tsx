import { Header } from "@/components/header"
import { InterestTags } from "@/components/interest-tags"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function CreatePostPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Create post:</h1>

        <Card className="bg-gray-200 p-4 mb-6">
          <CardContent className="p-0">
            <div className="bg-blue-100 rounded-xl p-6 mb-6">
              <h3 className="text-xl mb-4">What interest would you like to choose?</h3>
              <InterestTags />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-blue-100 p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Upload Video/photo</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex justify-center items-center h-40 bg-white rounded-md">
                  <ImagePlus className="h-16 w-16 text-gray-400" />
                </CardContent>
              </Card>

              <Card className="bg-blue-100 p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Entry</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Textarea placeholder="Type here...." className="h-40 bg-white" />
                </CardContent>
              </Card>

              <Card className="bg-blue-100 p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Archive</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Entry 1</li>
                    <li>Entry 2</li>
                    <li>Entry 3</li>
                    <li>Entry 4</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-100 p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Explore</CardTitle>
                </CardHeader>
                <CardContent className="p-0">{/* Empty explore section as shown in the mockup */}</CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
