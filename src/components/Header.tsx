"use client"
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  const navItems = [
    { label: 'Discover', href: '/discover' },
    { label: 'Pulse', href: '/' },
    { label: 'Trackers', href: '/trackers' },
    { label: 'Perpetuals', href: '/perpetuals' },
    { label: 'Yield', href: '/yield' },
    { label: 'Vision', href: '/vision' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Rewards', href: '/rewards' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-neutral-950 border-b border-neutral-800">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-neutral-950"></div>
            </div>
            <span className="text-white font-semibold text-sm">AXIOM Pro</span>
          </div>

          {/* Center: Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                  isActive(item.href)
                    ? "text-[#6366f1] bg-[#6366f1]/10"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Search, SOL selector, Deposit, Icons */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by token or CA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 w-64 text-sm bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]"
              />
              <span className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-xs text-neutral-500">/</span>
            </div>

            {/* SOL Selector */}
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-neutral-900 border border-neutral-800 rounded-md cursor-pointer hover:bg-neutral-800 transition-colors">
              <div className="flex gap-0.5">
                <div className="w-3 h-3 bg-[#6366f1] rounded-sm"></div>
                <div className="w-3 h-3 bg-[#6366f1] rounded-sm -ml-1"></div>
                <div className="w-3 h-3 bg-[#6366f1] rounded-sm -ml-1"></div>
              </div>
              <span className="text-sm text-white font-medium">SOL</span>
              <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Deposit Button */}
            <button className="px-4 py-1.5 text-sm font-medium bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-colors">
              Deposit
            </button>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <button className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-neutral-900 border border-neutral-800 rounded-md cursor-pointer hover:bg-neutral-800 transition-colors">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-xs text-neutral-400">0</span>
                <span className="text-xs text-neutral-400">0</span>
                <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

