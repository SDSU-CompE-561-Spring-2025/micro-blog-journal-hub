import Link from "next/link"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 flex items-center justify-between">
      <Link href="/feed" className="text-white text-2xl font-bold">
        RecollectionRealm
      </Link>
      <div className="w-full max-w-md mx-4">
        <Input type="search" placeholder="Search..." className="w-full rounded-full bg-white" />
      </div>
      <nav className="flex space-x-4">
        <Link href="/collaboration" className="text-white hover:underline">
          Collaboration
        </Link>
        <Link href="/create-post" className="text-white hover:underline">
          Create
        </Link>
        <Link href="/friends" className="text-white hover:underline">
          Friend
        </Link>
        <Link href="/profile" className="text-white hover:underline">
          Profile
        </Link>
      </nav>
    </header>
  )
}
