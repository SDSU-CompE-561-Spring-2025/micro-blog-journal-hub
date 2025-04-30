import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface PostCardProps {
  author: string
  content: string
  signature?: string
  date: string
  imageUrl: string
}

export function PostCard({ author, content, signature, date, imageUrl }: PostCardProps) {
  return (
    <Card className="overflow-hidden bg-green-200 rounded-xl">
      <div className="grid md:grid-cols-2 gap-4">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{author}:</h3>
          <p className="mb-4">{content}</p>
          {signature && <p className="text-green-700">{signature}</p>}
          <p className="text-gray-600 mt-4">{date}</p>
        </CardContent>
        <div className="relative h-64 md:h-auto">
          <Image src={imageUrl || "/placeholder.svg"} alt={`Post by ${author}`} fill className="object-cover" />
          <div className="absolute bottom-4 right-4 text-blue-500">Click to see more...</div>
        </div>
      </div>
    </Card>
  )
}
