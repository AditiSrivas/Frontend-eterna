"use client"
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  category?: 'new' | 'final' | 'migrated'
}

export function FilterPanel({ isOpen, onClose, category }: FilterPanelProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'final' | 'migrated'>(category || 'new')
  
  // Update activeTab when category changes
  useEffect(() => {
    if (category) {
      setActiveTab(category)
    }
  }, [category])
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>(['Pump', 'Moonshot', 'Candle', 'Jupiter Studio', 'LaunchLab', 'Meteora AMM', 'Orca'])
  const [selectedQuoteTokens, setSelectedQuoteTokens] = useState<string[]>(['SOL', 'USDC'])

  const protocols = [
    { name: 'Pump', icon: '🟢', active: selectedProtocols.includes('Pump') },
    { name: 'Moonshot', icon: '🌙', active: selectedProtocols.includes('Moonshot') },
    { name: 'Candle', icon: '🕯️', active: selectedProtocols.includes('Candle') },
    { name: 'Jupiter Studio', icon: '🌀', active: selectedProtocols.includes('Jupiter Studio') },
    { name: 'LaunchLab', icon: '🚀', active: selectedProtocols.includes('LaunchLab') },
    { name: 'Meteora AMM', icon: '🌠', active: selectedProtocols.includes('Meteora AMM') },
    { name: 'Orca', icon: '🐋', active: selectedProtocols.includes('Orca') },
    { name: 'Bonk', icon: '🐕', active: selectedProtocols.includes('Bonk') },
    { name: 'Heaven', icon: '☁️', active: selectedProtocols.includes('Heaven') },
    { name: 'Sugar', icon: '🍩', active: selectedProtocols.includes('Sugar') },
    { name: 'Moonit', icon: '🌙', active: selectedProtocols.includes('Moonit') },
    { name: 'Dynamic BC', icon: '⚡', active: selectedProtocols.includes('Dynamic BC') },
    { name: 'Meteora AMM V2', icon: '🌠', active: selectedProtocols.includes('Meteora AMM V2') },
    { name: 'Bags', icon: '💰', active: selectedProtocols.includes('Bags') },
    { name: 'Daos.fun', icon: '👾', active: selectedProtocols.includes('Daos.fun') },
    { name: 'Believe', icon: '🍃', active: selectedProtocols.includes('Believe') },
    { name: 'Boop', icon: '🐱', active: selectedProtocols.includes('Boop') },
    { name: 'Raydium', icon: 'R', active: selectedProtocols.includes('Raydium') },
    { name: 'Pump AMM', icon: '💊', active: selectedProtocols.includes('Pump AMM') },
  ]

  const quoteTokens = [
    { name: 'SOL', icon: '🟢', active: selectedQuoteTokens.includes('SOL') },
    { name: 'USDC', icon: '🔵', active: selectedQuoteTokens.includes('USDC') },
    { name: 'USD1', icon: '🟡', active: selectedQuoteTokens.includes('USD1') },
  ]

  const toggleProtocol = (name: string) => {
    setSelectedProtocols(prev => 
      prev.includes(name) 
        ? prev.filter(p => p !== name)
        : [...prev, name]
    )
  }

  const toggleQuoteToken = (name: string) => {
    setSelectedQuoteTokens(prev => 
      prev.includes(name) 
        ? prev.filter(q => q !== name)
        : [...prev, name]
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-lg overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Filters</h2>
            <div className="flex items-center gap-2">
              <button className="text-neutral-400 hover:text-white">↻</button>
              <button onClick={onClose} className="text-neutral-400 hover:text-white">✕</button>
            </div>
          </div>
          <div className="flex gap-2 border-b border-neutral-800 pb-2">
            {(['new', 'final', 'migrated'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1 text-sm transition-colors",
                  activeTab === tab 
                    ? "text-white border-b-2 border-white" 
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {tab === 'new' ? 'New Pairs' : tab === 'final' ? 'Final Stretch' : 'Migrated'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Protocols */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white">Protocols</h3>
              <button 
                onClick={() => setSelectedProtocols(protocols.map(p => p.name))}
                className="text-xs text-blue-500 hover:text-blue-400"
              >
                Select All
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {protocols.map((protocol) => (
                <button
                  key={protocol.name}
                  onClick={() => toggleProtocol(protocol.name)}
                  className={cn(
                    "px-3 py-2 rounded-md text-xs transition-colors flex items-center gap-1",
                    protocol.active
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  )}
                >
                  <span>{protocol.icon}</span>
                  <span className="truncate">{protocol.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quote Tokens */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white">Quote Tokens</h3>
              <button 
                onClick={() => setSelectedQuoteTokens([])}
                className="text-xs text-blue-500 hover:text-blue-400"
              >
                Unselect All
              </button>
            </div>
            <div className="flex gap-2">
              {quoteTokens.map((token) => (
                <button
                  key={token.name}
                  onClick={() => toggleQuoteToken(token.name)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2",
                    token.active
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  )}
                >
                  <span>{token.icon}</span>
                  <span>{token.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Keywords */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Search Keywords</label>
            <input
              type="text"
              placeholder="keyword1, keyword2..."
              className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Exclude Keywords</label>
            <input
              type="text"
              placeholder="keyword1, keyword2..."
              className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Audit Tab */}
          <div>
            <div className="flex gap-2 border-b border-neutral-800 mb-3">
              <button className="px-3 py-1 text-sm text-white border-b-2 border-white">Audit</button>
              <button className="px-3 py-1 text-sm text-neutral-400 hover:text-white">$ Metrics</button>
              <button className="px-3 py-1 text-sm text-neutral-400 hover:text-white">Socials</button>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" className="rounded" />
                <span>Dex Paid</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" className="rounded" />
                <span>CA ends in 'pump'</span>
              </label>
            </div>
          </div>

          {/* Age Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Age</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="flex-1 px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <select className="px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-blue-500">
                <option>m</option>
                <option>h</option>
                <option>d</option>
              </select>
              <input
                type="number"
                placeholder="Max"
                className="flex-1 px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <select className="px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:border-blue-500">
                <option>m</option>
                <option>h</option>
                <option>d</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-neutral-800">
            <button className="flex-1 px-4 py-2 rounded-md bg-neutral-800 text-white text-sm hover:bg-neutral-700 transition-colors">
              Import
            </button>
            <button className="flex-1 px-4 py-2 rounded-md bg-neutral-800 text-white text-sm hover:bg-neutral-700 transition-colors">
              Export
            </button>
            <button className="px-6 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors">
              Apply All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

