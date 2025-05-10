'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "What's New", href: "/whats-new" },
  { name: "Create", href: "/create-post" },
  { name: "Collaborate", href: "/collaboration" },
  { name: "Friends", href: "/friends" },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="w-full px-4 py-2 bg-gradient-to-r from-purple-200 to-blue-300
                   dark:from-slate-700 dark:to-slate-800
                   border-y border-black dark:border-gray-600
                   text-sm font-medium">

      <div className={`max-w-[1400px] mx-auto grid grid-cols-${navItems.length}`}>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-center text-[#3A6BC5] dark:text-sky-300 py-1 transition-all ${
              pathname === item.href
                ? 'underline underline-offset-4 font-semibold dark:text-sky-100'
                : 'hover:underline dark:hover:text-sky-200'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}