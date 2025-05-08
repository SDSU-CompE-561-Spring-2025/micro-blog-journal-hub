"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

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
];

type InterestTagsProps = {
  onTagsChange: (tags: string[]) => void;
  initialTags: string[];
};

export default function InterestTags({ onTagsChange, initialTags }: InterestTagsProps) {
  const [selected, setSelected] = useState<string[]>(initialTags);

  useEffect(() => {
    onTagsChange(selected); // Pass tags directly, not { tags }
  }, [selected, onTagsChange]);

  const toggleTag = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((interest) => {
        const isSelected = selected.includes(interest);
        return (
          <Badge
            key={interest}
            onClick={() => toggleTag(interest)}
            className={`cursor-pointer px-3 py-1 rounded-md flex items-center gap-1 ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            <span>{interest}</span>
            {isSelected && <X className="h-4 w-4" />}
          </Badge>
        );
      })}
    </div>
  );
}
