import { NextResponse } from 'next/server'
import { Category, TokenRow, SimilarToken } from '@/lib/types'

const CHAINS = ['Solana', 'Ethereum', 'Base', 'Arbitrum'] as const

function generateSimilarTokens(symbol: string, count: number = 2): SimilarToken[] {
  return Array.from({ length: count }, (_, i) => {
    const ages = ['1y', '10mo', '5mo', '3mo', '1mo'] as const
    const txCounts = ['1y', '10mo', '5mo', '3mo', '1mo'] as const
    const mcap = Math.floor(Math.random() * 50_000) + 1_000
    const ageIndex = Math.floor(Math.random() * ages.length)
    const txIndex = Math.floor(Math.random() * txCounts.length)
    
    return {
      id: `similar-${symbol}-${i}`,
      symbol: symbol,
      name: symbol,
      age: ages[ageIndex]!,
      txCount: txCounts[txIndex]!,
      marketCap: mcap
    }
  })
}

function randomToken(id: number, category: Category): TokenRow {
  const price = +(Math.random() * 10 + Math.random()).toFixed(6)
  const change = +(Math.random() * 20 - 10).toFixed(2)
  const volume = Math.floor(Math.random() * 1_000_000)
  const mcap = Math.floor(volume * (2 + Math.random() * 20))
  // Age varies by category: new pairs are very recent (seconds), final stretch is hours, migrated varies
  // For new pairs, use seconds (0-60), for others use minutes
  const age = category === 'new' 
    ? Math.random() * 60 / 60 // 0-60 seconds converted to minutes (0-1 minute)
    : category === 'final'
    ? Math.floor(Math.random() * 24 * 60) // 0-24 hours in minutes
    : Math.floor(Math.random() * 60 * 24 * 30) // 0-30 days in minutes
  const chain = CHAINS[Math.floor(Math.random() * CHAINS.length)]!
  const fees = +(Math.random() * 0.1).toFixed(4)
  const txCount = Math.floor(Math.random() * 3000)
  const address = `${Math.random().toString(36).substring(2, 9)}...${Math.random().toString(36).substring(2, 6)}`
  const symbol = `TOK${id}`
  // Bonding percentage varies by category: new pairs are low, final stretch is higher, migrated is highest
  const bondingPercentage = category === 'new'
    ? Math.random() * 20 // 0-20% for new pairs
    : category === 'final'
    ? 20 + Math.random() * 60 // 20-80% for final stretch
    : 60 + Math.random() * 40 // 60-100% for migrated
  
  return {
    id: `${category}-${id}`,
    symbol,
    name: `Token ${id}`,
    chain,
    price,
    change24h: change,
    volume24h: volume,
    marketCap: mcap,
    ageMinutes: age,
    category,
    fees,
    transactionCount: txCount,
    address,
    bondingPercentage: +(bondingPercentage.toFixed(2)),
    similarTokens: generateSimilarTokens(symbol, 2)
  }
}

export async function GET() {
  // simulate progressive loading
  const groups: Category[] = ['new', 'final', 'migrated']
  const data: Record<Category, TokenRow[]> = {
    new: [],
    final: [],
    migrated: []
  }

  for (const group of groups) {
    const rows = Array.from({ length: 20 }, (_, i) => randomToken(i + 1, group))
    // Sort by age: newest first (lowest ageMinutes for new pairs)
    rows.sort((a, b) => a.ageMinutes - b.ageMinutes)
    data[group] = rows
  }
  return NextResponse.json({ data })
}


