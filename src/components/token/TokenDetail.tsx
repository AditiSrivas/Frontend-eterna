"use client"
import { useQuery } from '@tanstack/react-query'
import { TokenRow } from '@/lib/types'
import { formatCurrency, formatPercent, ageToString } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function TokenDetail({ tokenId }: { tokenId: string }) {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery<{ data: Record<string, TokenRow[]> }>({
    queryKey: ['tokens'],
    queryFn: async () => {
      const res = await fetch('/api/tokens')
      if (!res.ok) throw new Error('Failed to fetch tokens')
      return res.json()
    }
  })

  if (isLoading) {
    return (
      <main className="min-h-screen px-4 md:px-6 lg:px-10 py-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center py-12 text-white">Loading token details...</div>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="min-h-screen px-4 md:px-6 lg:px-10 py-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center py-12 text-red-500">Failed to load token details</div>
        </div>
      </main>
    )
  }

  // Find the token across all categories
  let token: TokenRow | undefined
  if (data?.data) {
    for (const category of Object.values(data.data)) {
      token = category.find(t => t.id === tokenId)
      if (token) break
    }
  }

  if (!token) {
    return (
      <main className="min-h-screen px-4 md:px-6 lg:px-10 py-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold mb-2 text-white">Token not found</h1>
            <button 
              onClick={() => router.push('/')}
              className="text-sm text-blue-500 hover:text-blue-400 underline"
            >
              Back to Pulse
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 md:px-6 lg:px-10 py-6">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-6 md:mb-8">
          <button 
            onClick={() => router.push('/')}
            className="text-sm text-blue-500 hover:text-blue-400 mb-4"
          >
            ← Back to Pulse
          </button>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-lg bg-neutral-800 flex items-center justify-center text-2xl font-bold text-white">
              {token.symbol[0]}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{token.symbol}</h1>
              <p className="text-sm md:text-base text-neutral-400">{token.name}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Token Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-400">Symbol:</span>
                <span className="font-medium text-white">{token.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Name:</span>
                <span className="font-medium text-white">{token.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Chain:</span>
                <span className="font-medium text-white">{token.chain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Category:</span>
                <span className="font-medium text-white capitalize">{token.category}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Market Data</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-400">Price:</span>
                <span className={cn('font-medium tabular-nums', token.change24h >= 0 ? 'text-green-500' : 'text-red-500')}>
                  {formatCurrency(token.price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">24h Change:</span>
                <span className={cn('font-medium tabular-nums', token.change24h >= 0 ? 'text-green-500' : 'text-red-500')}>
                  {formatPercent(token.change24h)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">24h Volume:</span>
                <span className="font-medium tabular-nums text-white">{formatCurrency(token.volume24h)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Market Cap:</span>
                <span className="font-medium tabular-nums text-white">{formatCurrency(token.marketCap)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Age:</span>
                <span className="font-medium text-white">{ageToString(token.ageMinutes)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-lg font-semibold mb-4 text-white">Trading</h2>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
              Buy {token.symbol}
            </button>
            <button className="px-6 py-3 rounded-md border border-neutral-700 hover:bg-neutral-800 text-neutral-300 transition-colors">
              Sell {token.symbol}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

