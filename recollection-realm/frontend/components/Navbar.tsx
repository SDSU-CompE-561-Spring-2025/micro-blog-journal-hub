// components/NavBar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: "What's New", href: "/whats-new" },
  { name: "Create", href: "/create" },
  { name: "Collaborate", href: "/collaborate" },
  { name: "Friends", href: "/friends" },
  { name: "Account Settings", href: "/account-settings" },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-6 px-6 py-4 bg-gradient-to-r from-[#8F41D3] to-[#121C29]">
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-white font-inter font-semibold ${
            pathname === item.href ? 'underline underline-offset-4' : 'hover:underline'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
