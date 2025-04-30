import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export default function CollaborationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Collaboration</h1>

        <Card className="bg-gray-200 p-4 mb-6">
          <CardContent className="p-0">
            <div className="bg-blue-100 rounded-xl p-6 mb-6">
              <h3 className="text-xl mb-4">Which Journal are we working on today!</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Sunny San Diego</li>
                  <li>Visit to the beach</li>
                  <li>Friends in Cornado</li>
                </ul>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cars & Coffee</li>
                  <li>Code 101</li>
                  <li>Thoughts I think of</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-blue-100 p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Add friends:</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Friend 1</li>
                    <li>Friend 2</li>
                    <li>Friend 3</li>
                  </ul>
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
                  <CardTitle className="text-xl">Journals</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex justify-center items-center h-40">
                  <div className="h-24 w-24 rounded-full border-2 border-black flex items-center justify-center">
                    <Plus className="h-12 w-12" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
