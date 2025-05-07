'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: "What's New", href: "/whats-new" },
  { name: "Create", href: "/create-post" },
  { name: "Collaborate", href: "/collaboration" },
  { name: "Friends", href: "/friends" },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="grid grid-cols-4 px-6 py-4 bg-gradient-to-r from-[#8F41D3] to-[#3A6BC5] text-center">
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-white font-inter font-semibold w-full ${
            pathname === item.href ? 'underline underline-offset-4' : 'hover:underline'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
