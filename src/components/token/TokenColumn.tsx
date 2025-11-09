"use client"
import { useEffect, useRef, useState, memo, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { TokenRow } from '@/lib/types'
import { MockPriceSocket } from '@/lib/mockSocket'
import { cn, formatCurrency, formatPercent, ageToString } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { FilterPanel } from './FilterPanel'
import { useAppDispatch, useAppSelector } from '@/components/token/hooks'
import { setSort, SortKey } from '@/store/tableSlice'

interface TokenColumnProps {
  category: 'new' | 'final' | 'migrated'
  tokens: TokenRow[]
  liveData: Record<string, { price: number; volume: number; marketCap: number; fees: number; txCount: number }>
  onUpdateLiveData: (id: string, data: { price: number; volume: number; marketCap: number; fees: number; txCount: number }) => void
}

export const TokenColumn = memo(function TokenColumn({ category, tokens, liveData, onUpdateLiveData }: TokenColumnProps) {
  const socketRef = useRef<MockPriceSocket | null>(null)
  const onUpdateLiveDataRef = useRef(onUpdateLiveData)
  const tokensRef = useRef(tokens)

  // Keep refs up to date
  useEffect(() => {
    onUpdateLiveDataRef.current = onUpdateLiveData
    tokensRef.current = tokens
  }, [onUpdateLiveData, tokens])

  useEffect(() => {
    if (!tokens.length) return
    const base: Record<string, number> = {}
    const ids = tokens.map((r) => {
      base[r.id] = r.price
      return r.id
    })
    const s = new MockPriceSocket(ids, base)
    s.on('price', (updates: unknown) => {
      const list = updates as { id: string; price: number }[]
      for (const u of list) {
        const token = tokensRef.current.find(t => t.id === u.id)
        if (token) {
          // Simulate real-time updates to other metrics
          const volumeChange = Math.random() * 0.1 - 0.05 // ±5%
          const mcapChange = Math.random() * 0.1 - 0.05
          const feesChange = Math.random() * 0.01 - 0.005
          const txChange = Math.floor(Math.random() * 5) - 2
          
          onUpdateLiveDataRef.current(u.id, {
            price: u.price,
            volume: Math.max(0, token.volume24h * (1 + volumeChange)),
            marketCap: Math.max(0, token.marketCap * (1 + mcapChange)),
            fees: Math.max(0, (token.fees || 0) + feesChange),
            txCount: Math.max(0, (token.transactionCount || 0) + txChange)
          })
        }
      }
    })
    socketRef.current = s
    return () => s.dispose()
  }, [tokens])

  const categoryLabels = {
    new: 'New Pairs',
    final: 'Final Stretch',
    migrated: 'Migrated'
  }

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<'P1' | 'P2' | 'P3'>('P1')
  const dispatch = useAppDispatch()
  const { sortKey, sortOrder } = useAppSelector((state) => state.table)

  const outlineColor = {
    new: 'border-green-500',
    final: 'border-[#6366f1]',
    migrated: 'border-yellow-500'
  }[category]

  // Sort tokens based on Redux state
  const sortedTokens = useMemo(() => {
    const sorted = [...tokens]
    sorted.sort((a, b) => {
      let aValue: number
      let bValue: number

      switch (sortKey) {
        case 'price':
          aValue = liveData[a.id]?.price ?? a.price
          bValue = liveData[b.id]?.price ?? b.price
          break
        case 'change':
          aValue = a.change24h
          bValue = b.change24h
          break
        case 'volume':
          aValue = liveData[a.id]?.volume ?? a.volume24h
          bValue = liveData[b.id]?.volume ?? b.volume24h
          break
        case 'marketCap':
          aValue = liveData[a.id]?.marketCap ?? a.marketCap
          bValue = liveData[b.id]?.marketCap ?? b.marketCap
          break
        case 'age':
          aValue = a.ageMinutes
          bValue = b.ageMinutes
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return aValue - bValue
      }
      return bValue - aValue
    })
    return sorted
  }, [tokens, liveData, sortKey, sortOrder])

  const handleSort = (key: SortKey) => {
    dispatch(setSort({ key }))
  }

  return (
    <div className="flex-1 min-w-0 relative">
      {/* Periodic moving purple glow gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'glow 8s ease-in-out infinite'
        }}
      />
      
      <div className="sticky top-0 z-10 bg-neutral-950 border-b border-neutral-800 pb-2 mb-2 relative">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-semibold text-white">{categoryLabels[category]}</h3>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="Filter"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 3H11M3 6H9M5 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="3" r="1" fill="currentColor"/>
              <circle cx="3" cy="6" r="1" fill="currentColor"/>
              <circle cx="7" cy="9" r="1" fill="currentColor"/>
            </svg>
          </button>
          <button
            onClick={() => handleSort('price')}
            className={cn(
              "text-neutral-400 hover:text-white transition-colors ml-auto",
              sortKey === 'price' && "text-[#6366f1]"
            )}
            aria-label="Sort by Price"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2V10M6 2L4 4M6 2L8 4M6 10L4 8M6 10L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>{tokens.length}</span>
            <button
              onClick={() => setSelectedPreset('P1')}
              className={cn(
                "px-1.5 py-0.5 rounded transition-colors",
                selectedPreset === 'P1' ? "bg-[#6366f1] text-white" : "hover:text-white"
              )}
            >
              P1
            </button>
            <button
              onClick={() => setSelectedPreset('P2')}
              className={cn(
                "px-1.5 py-0.5 rounded transition-colors",
                selectedPreset === 'P2' ? "bg-[#6366f1] text-white" : "hover:text-white"
              )}
            >
              P2
            </button>
            <button
              onClick={() => setSelectedPreset('P3')}
              className={cn(
                "px-1.5 py-0.5 rounded transition-colors",
                selectedPreset === 'P3' ? "bg-[#6366f1] text-white" : "hover:text-white"
              )}
            >
              P3
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-2 relative">
        {sortedTokens.map((token) => (
          <TokenCard 
            key={token.id} 
            token={token} 
            liveData={liveData[token.id]} 
            category={category}
            outlineColor={outlineColor}
          />
        ))}
      </div>
      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} category={category} />
    </div>
  )
})

const TokenCard = memo(function TokenCard({ 
  token, 
  liveData,
  category,
  outlineColor
}: { 
  token: TokenRow
  liveData?: { price: number; volume: number; marketCap: number; fees: number; txCount: number }
  category: 'new' | 'final' | 'migrated'
  outlineColor: string
}) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isPfpHovered, setIsPfpHovered] = useState(false)
  const [isCardHovered, setIsCardHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const pfpRef = useRef<HTMLDivElement>(null)
  const prevValuesRef = useRef({
    price: token.price,
    volume: token.volume24h,
    marketCap: token.marketCap,
    fees: token.fees || 0,
    txCount: token.transactionCount || 0
  })

  const price = liveData?.price ?? token.price
  const volume = liveData?.volume ?? token.volume24h
  const marketCap = liveData?.marketCap ?? token.marketCap
  const fees = liveData?.fees ?? token.fees ?? 0
  const txCount = liveData?.txCount ?? token.transactionCount ?? 0
  const bondingPercentage = token.bondingPercentage ?? 0

  useEffect(() => {
    if (liveData) {
      prevValuesRef.current = {
        price: liveData.price,
        volume: liveData.volume,
        marketCap: liveData.marketCap,
        fees: liveData.fees,
        txCount: liveData.txCount
      }
    }
  }, [liveData])

  const handleClick = () => {
    router.push(`/token/${token.id}`)
  }

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (token.address) {
      navigator.clipboard.writeText(token.address)
    }
  }

  const priceUp = price >= prevValuesRef.current.price
  const volumeUp = volume >= prevValuesRef.current.volume
  const mcapUp = marketCap >= prevValuesRef.current.marketCap

  return (
    <div 
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true)
        setIsCardHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsCardHovered(false)
        setIsPfpHovered(false)
      }}
      className={cn(
        "bg-neutral-900 border border-neutral-800 rounded-lg p-3 hover:border-neutral-700 transition-colors cursor-pointer relative",
        isPfpHovered && "z-50"
      )}
    >
      <div className="flex items-start gap-3">
        {/* PFP Square - slightly bigger with colored outline */}
        <div 
          ref={pfpRef}
          className="relative flex-shrink-0 z-10"
          onMouseEnter={(e) => {
            e.stopPropagation()
            setIsPfpHovered(true)
            setIsCardHovered(false)
          }}
          onMouseLeave={(e) => {
            e.stopPropagation()
            setIsPfpHovered(false)
            // Check if mouse is still over the card
            if (cardRef.current && e.relatedTarget instanceof Node && cardRef.current.contains(e.relatedTarget)) {
              setIsCardHovered(true)
            }
          }}
        >
          <div className={cn(
            "h-16 w-16 rounded-md bg-neutral-800 flex items-center justify-center font-semibold text-xl text-white border-2 transition-all",
            outlineColor,
            isPfpHovered && "scale-125 z-20"
          )}>
            {token.symbol[0]}
          </div>
          {/* PFP Expanded thing on hover */}
          {isPfpHovered && (
            <div className="absolute left-0 top-full mt-2 z-[100] bg-neutral-900 border border-neutral-700 rounded-lg p-4 shadow-xl min-w-[200px]">
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("h-12 w-12 rounded-md bg-neutral-800 flex items-center justify-center font-semibold text-base text-white border-2", outlineColor)}>
                  {token.symbol[0]}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{token.name}</div>
                  <div className="text-xs text-neutral-400">{token.symbol}</div>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Price:</span>
                  <span className={cn("font-medium", priceUp ? "text-green-500" : "text-red-500")}>
                    {formatCurrency(price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">24h Change:</span>
                  <span className={cn("font-medium", token.change24h >= 0 ? "text-green-500" : "text-red-500")}>
                    {formatPercent(token.change24h)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Market Cap:</span>
                  <span className="font-medium text-white">{formatCurrency(marketCap)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Volume:</span>
                  <span className="font-medium text-white">{formatCurrency(volume)}</span>
                </div>
                {token.address && (
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-800">
                    <span className="text-neutral-400">Address:</span>
                    <span className="font-mono text-xs text-neutral-300 truncate max-w-[120px]">
                      {token.address.slice(0, 6)}...{token.address.slice(-4)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Three-line compact layout */}
        <div className="flex-1 min-w-0">
          {/* Line 1: Name and copy address option */}
          <div className="flex items-center gap-2 mb-0.5">
            <div className="font-semibold text-white text-sm truncate">{token.name}</div>
            {token.address && (
              <button
                onClick={handleCopyAddress}
                className="flex-shrink-0 text-neutral-400 hover:text-white transition-colors"
                aria-label="Copy address"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </button>
            )}
          </div>

          {/* Line 2: Time and other info */}
          <div className="flex items-center gap-2 mb-0.5 text-xs">
            <span className={cn(
              "font-medium tabular-nums",
              token.change24h >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {ageToString(token.ageMinutes)}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-400">{token.symbol}</span>
            <span className="text-neutral-400">•</span>
            <span className={cn(
              "font-medium tabular-nums",
              token.change24h >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {formatPercent(token.change24h)}
            </span>
          </div>

          {/* Line 3: Other info (percentages, metrics) */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-medium tabular-nums">
              {formatPercent(token.change24h)} 24h
            </span>
            <span>•</span>
            <span>DS {Math.floor((token.ageMinutes % 5) + 1)}m</span>
            <span>•</span>
            <span className="font-medium tabular-nums">
              {Math.floor((token.bondingPercentage || 0) % 100)}%
            </span>
          </div>
        </div>

        {/* Right side: MC, V, F, TX vertically aligned */}
        <div className="flex flex-col items-end gap-0.5 text-xs flex-shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-neutral-500">MC</span>
            <span className={cn(
              "font-medium tabular-nums",
              mcapUp ? "text-green-500" : "text-red-500"
            )}>
              {formatCurrency(marketCap)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-neutral-500">V</span>
            <span className={cn(
              "font-medium tabular-nums text-white",
              volumeUp ? "text-green-500" : "text-red-500"
            )}>
              {formatCurrency(volume)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-neutral-500">F</span>
            <span className="font-medium tabular-nums text-white">
              {fees.toFixed(3)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-neutral-500">TX</span>
            <span className="font-medium tabular-nums text-white">
              {txCount}
            </span>
          </div>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="mt-1 px-2.5 py-1 text-xs rounded-xl bg-[#6366f1] text-white hover:bg-[#4f46e5] transition-colors font-medium flex items-center gap-1.5"
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M5.5 0L2 7H5L4.5 12L8 5H5L5.5 0Z" fill="black"/>
            </svg>
            {Math.floor((token.marketCap / 1000) % 5) || 1} SOL
          </button>
        </div>
      </div>

      {/* Hover text display on card (not PFP) - centered at top */}
      {isCardHovered && !isPfpHovered && (
        <div className="absolute inset-x-0 top-2 flex items-center justify-center z-10 pointer-events-none">
          <div className={cn(
            "text-sm font-medium px-3 py-1.5 rounded-md bg-neutral-900/95 backdrop-blur-sm border",
            category === 'new' && bondingPercentage !== 0 && (
              bondingPercentage >= 0 ? "text-green-500 border-green-500/30" : "text-red-500 border-red-500/30"
            ),
            category === 'final' && "text-[#a78bfa] border-[#6366f1]/30",
            category === 'migrated' && "text-yellow-300 border-yellow-500/30"
          )}>
            {category === 'new' && bondingPercentage !== 0 && `Bonding: ${bondingPercentage >= 0 ? '+' : ''}${bondingPercentage.toFixed(2)}%`}
            {category === 'final' && 'Migrating'}
            {category === 'migrated' && 'Virtual Curve'}
          </div>
        </div>
      )}
    </div>
  )
})

