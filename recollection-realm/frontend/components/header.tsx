import Link from "next/link"
import { User, Search } from "lucide-react"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-[#8F41D3] to-[#3A6BC5] py-4 px-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/home">
          <h1 className="text-white font-inter italic text-2xl font-semibold cursor-pointer">
            RecollectionRealm
          </h1>
        </Link>

        <div className="relative flex-1 max-w-md mr-40">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#8F41D3] text-gray-600"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <Link href="/profile">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-black">
            <User className="w-6 h-6 text-black" />
          </div>
        </Link>
      </div>
    </header>
  )
}