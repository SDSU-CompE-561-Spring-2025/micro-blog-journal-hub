"use client"

import Link from "next/link"
import { User, Search, Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Initialize darkMode state from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    // Ensure this runs only on the client
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode")
      return savedMode === "true"
    }
    return false // Default for SSR or if window is not available
  })

  // Effect to check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, []) // Empty dependency array, runs once on mount

  // Effect to apply dark mode class to <html> and persist to localStorage
  // Runs after initial render and whenever `darkMode` state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", "true")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", "false")
    }
  }, [darkMode]) // Dependency: re-run if darkMode changes

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    // Optional: Reset dark mode on logout if desired
    // localStorage.removeItem("darkMode");
    // document.documentElement.classList.remove("dark");
    // setDarkMode(false); 
    window.location.href = "/login"
  }

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <header className="bg-gradient-to-r from-[#8F41D3] to-[#3A6BC5] py-4 px-6 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900">
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
            className="w-full py-2 px-4 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#8F41D3] text-gray-600
                       dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:ring-violet-500"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full text-white hover:bg-white/20 dark:hover:bg-white/10"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded-full border border-black hover:bg-gray-200
                         dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-white text-black px-4 py-2 rounded-full border border-black hover:bg-gray-200
                             dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500">
                Login
              </button>
            </Link>
          )}

          <Link href="/profile">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-black
                        dark:bg-gray-600 dark:border-gray-500">
              <User className="w-6 h-6 text-black dark:text-white" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}