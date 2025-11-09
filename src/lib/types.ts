export type Category = 'new' | 'final' | 'migrated'

export interface SimilarToken {
  id: string
  symbol: string
  name: string
  age: string
  txCount: string
  marketCap: number
}

export interface TokenRow {
  id: string
  symbol: string
  name: string
  chain: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  ageMinutes: number
  category: Category
  fees?: number
  transactionCount?: number
  address?: string
  bondingPercentage?: number
  similarTokens?: SimilarToken[]
}


