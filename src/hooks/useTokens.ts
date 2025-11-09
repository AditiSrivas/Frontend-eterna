"use client"
import { useQuery } from '@tanstack/react-query'
import { Category, TokenRow } from '@/lib/types'

export interface TokenDataResult {
  data: Record<Category, TokenRow[]>
}

export function useTokens() {
  return useQuery<TokenDataResult>({
    queryKey: ['tokens'],
    queryFn: async () => {
      const res = await fetch('/api/tokens', { next: { revalidate: 5 } })
      if (!res.ok) throw new Error('Failed to fetch tokens')
      return res.json()
    }
  })
}


