import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface FriendPostProps {
  author: string
  content: string
  date?: string
  imageUrl: string
}

export function FriendPost({ author, content, date, imageUrl }: FriendPostProps) {
  return (
    <Card className="overflow-hidden bg-blue-200 rounded-xl">
      <div className="grid md:grid-cols-2 gap-4">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{author}:</h3>
          <p className="mb-4">{content}</p>
          {date && <p className="text-gray-600 mt-4">{date}</p>}
        </CardContent>
        <div className="relative h-64 md:h-auto">
          <Image src={imageUrl || "/placeholder.svg"} alt={`Post by ${author}`} fill className="object-cover" />
        </div>
      </div>
    </Card>
  )
}
