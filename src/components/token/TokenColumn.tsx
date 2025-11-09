"use client"
import { useEffect, useRef, useState, memo } from 'react'
import { useRouter } from 'next/navigation'
import { TokenRow } from '@/lib/types'
import { MockPriceSocket } from '@/lib/mockSocket'
import { cn, formatCurrency, formatPercent, ageToString } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

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

  return (
    <div className="flex-1 min-w-0">
      <div className="sticky top-0 z-10 bg-neutral-950 border-b border-neutral-800 pb-2 mb-2">
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
          <div className="flex items-center gap-2 text-xs text-neutral-400 ml-auto">
            <span>{tokens.length}</span>
            <span>P1 P2 P3</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {tokens.map((token) => (
          <TokenCard key={token.id} token={token} liveData={liveData[token.id]} />
        ))}
      </div>
    </div>
  )
})

const TokenCard = memo(function TokenCard({ 
  token, 
  liveData 
}: { 
  token: TokenRow
  liveData?: { price: number; volume: number; marketCap: number; fees: number; txCount: number }
}) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 hover:border-neutral-700 transition-colors cursor-pointer relative"
    >
      <div className="flex items-start gap-3">
        {/* PFP Square - slightly bigger */}
        <div className="relative flex-shrink-0">
          <div className="h-12 w-12 rounded-md bg-neutral-800 flex items-center justify-center font-semibold text-base text-white">
            {token.symbol[0]}
          </div>
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
            className="mt-1 px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
          >
            {Math.floor((token.marketCap / 1000) % 5) || 1} SOL
          </button>
        </div>
      </div>

      {/* Bonding percentage display on hover */}
      {isHovered && bondingPercentage > 0 && (
        <div className="absolute inset-0 bg-neutral-900/95 border-2 border-blue-500 rounded-lg flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {bondingPercentage.toFixed(2)}%
            </div>
            <div className="text-xs text-neutral-400">Bonding</div>
          </div>
        </div>
      )}
    </div>
  )
})

