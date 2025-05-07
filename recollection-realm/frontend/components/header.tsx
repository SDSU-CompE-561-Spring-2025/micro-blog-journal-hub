"use client"

import Link from "next/link"
import { User, Search } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    window.location.href = "/login"
  }

  return (
    <header className="bg-gradient-to-r from-[#8F41D3] to-[#3A6BC5] py-4 px-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/">
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

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded-full border border-black hover:bg-gray-200"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-white text-black px-4 py-2 rounded-full border border-black hover:bg-gray-200">
                Login
              </button>
            </Link>
          )}

          <Link href="/profile">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-black">
              <User className="w-6 h-6 text-black" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
