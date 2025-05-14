"use client"

import { Button } from "@/components/ui/button"

interface InterestTagsProps {
  selectedTags: string[]
  onTagSelect: (tag: string) => void
  className?: string
}

export function InterestTags({ selectedTags, onTagSelect, className }: InterestTagsProps) {
  const interests = ["Adventure", "Travel", "Fitness", "Cooking", "Gaming", "Photography", "Nature", "Technology"]

  return (
    <div className={className}>
      {interests.map((interest) => (
        <Button
          key={interest}
          variant={selectedTags.includes(interest) ? "default" : "outline"}
          onClick={() => onTagSelect(interest)}
          className="rounded-full"
        >
          {interest}
        </Button>
      ))}
    </div>
  )
}
