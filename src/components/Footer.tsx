"use client"
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Footer() {
  const [selectedPreset, setSelectedPreset] = useState('PRESET 1')
  const [selectedWallet, setSelectedWallet] = useState('1 ≡ 0')

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950 border-t border-neutral-800">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="flex items-center justify-between h-12">
          {/* Left Section: Preset, Wallet, Icons, Navigation */}
          <div className="flex items-center gap-3">
            {/* PRESET 1 Button */}
            <button className="px-3 py-1.5 bg-[#6366f1] text-white text-xs font-medium rounded-lg flex items-center gap-2 hover:bg-[#4f46e5] transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3H11M3 6H9M5 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="9" cy="3" r="1" fill="currentColor"/>
                <circle cx="3" cy="6" r="1" fill="currentColor"/>
                <circle cx="7" cy="9" r="1" fill="currentColor"/>
              </svg>
              {selectedPreset}
            </button>

            {/* Wallet Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setSelectedWallet(selectedWallet === '1 ≡ 0' ? '2 ≡ 0' : '1 ≡ 0')}
                className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-white text-xs font-medium rounded-full flex items-center gap-1 hover:bg-neutral-800 transition-colors"
              >
                {selectedWallet}
                <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Settings and Wallet Icons */}
            <button className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </button>

            {/* Navigation Links */}
            <div className="flex items-center gap-4 ml-2">
              <a href="/wallet" className="text-xs text-white hover:text-[#6366f1] transition-colors relative">
                Wallet
                <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </a>
              <a href="/twitter" className="text-xs text-white hover:text-[#6366f1] transition-colors relative">
                <span className="flex items-center gap-1">
                  <span>X</span>
                  <span className="text-[10px]">Twitter</span>
                </span>
                <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </a>
              <a href="/discover" className="text-xs text-white hover:text-[#6366f1] transition-colors relative">
                Discover
                <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </a>
              <a href="/" className="text-xs text-white hover:text-[#6366f1] transition-colors relative">
                Pulse
                <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </a>
              <a href="/pnl" className="text-xs text-white hover:text-[#6366f1] transition-colors">
                PnL
              </a>
            </div>
          </div>

          {/* Middle Section: Financial Data */}
          <div className="flex items-center gap-4">
            {/* Status Pills */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>

            {/* Crypto Prices */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">₿</div>
                <span className="text-xs text-orange-500 font-medium">$102.2K</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">Ξ</div>
                <span className="text-xs text-blue-400 font-medium">$3420</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">◎</div>
                <span className="text-xs text-green-500 font-medium">$159.01</span>
              </div>
            </div>

            {/* Additional Value */}
            <span className="text-xs text-white font-medium">$65.3K</span>

            {/* Gas Prices */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs text-neutral-400">0.0245</span>
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs text-neutral-400">0.003</span>
            </div>
          </div>

          {/* Right Section: Status, Global, Search, Icons */}
          <div className="flex items-center gap-3">
            {/* Connection Status */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-500 font-medium">Connection is stable</span>
            </div>

            {/* GLOBAL Dropdown */}
            <button className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-white text-xs font-medium rounded-md flex items-center gap-1 hover:bg-neutral-800 transition-colors">
              GLOBAL
              <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="relative">
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-2 py-1 w-32 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#6366f1]"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <button className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </button>
              <a href="/discord" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a href="/twitter" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="/docs" className="text-xs text-white hover:text-[#6366f1] transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

