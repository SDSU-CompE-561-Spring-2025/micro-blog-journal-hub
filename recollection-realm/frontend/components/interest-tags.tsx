"use client"

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const interests = [
  "Sports",
  "News",
  "College Resources",
  "Diet Plans",
  "The Grammys",
  "Conspiracies",
  "Cinema",
  "Astrology",
  "Playstation",
  "History Channel",
]

export function InterestTags() {
  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((interest) => (
        <Badge
          key={interest}
          className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-1"
        >
          <X className="h-4 w-4" />
          <span>{interest}</span>
        </Badge>
      ))}
    </div>
  )
}
