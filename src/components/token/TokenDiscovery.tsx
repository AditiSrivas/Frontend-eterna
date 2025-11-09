"use client"
import { useCallback, useState } from 'react'
import { useTokens } from '@/hooks/useTokens'
import { TokenColumn } from './TokenColumn'
import { FilterPanel } from './FilterPanel'
import { Skeleton } from '@/components/ui/skeleton'

export function TokenDiscovery() {
  const { data, isLoading, isError, error, refetch } = useTokens()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [liveData, setLiveData] = useState<Record<string, { price: number; volume: number; marketCap: number; fees: number; txCount: number }>>({})

  const handleUpdateLiveData = useCallback((id: string, newData: { price: number; volume: number; marketCap: number; fees: number; txCount: number }) => {
    setLiveData(prev => ({
      ...prev,
      [id]: newData
    }))
  }, [])

  const newPairs = data?.data?.new ?? []
  const finalStretch = data?.data?.final ?? []
  const migrated = data?.data?.migrated ?? []

  return (
    <section>

      {/* Three Columns Layout */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="sticky top-0 z-10 bg-neutral-950 border-b border-neutral-800 pb-2 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-4 w-20 bg-neutral-800" />
                  <Skeleton className="h-4 w-4 bg-neutral-800 rounded" />
                  <div className="flex items-center gap-2 text-xs text-neutral-400 ml-auto">
                    <Skeleton className="h-3 w-6 bg-neutral-800" />
                    <Skeleton className="h-3 w-12 bg-neutral-800" />
                  </div>
                </div>
              </div>
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="bg-neutral-900 border border-neutral-800 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-md bg-neutral-800" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24 bg-neutral-800" />
                      <Skeleton className="h-3 w-32 bg-neutral-800" />
                      <div className="grid grid-cols-2 gap-2">
                        <Skeleton className="h-3 w-16 bg-neutral-800" />
                        <Skeleton className="h-3 w-16 bg-neutral-800" />
                        <Skeleton className="h-3 w-16 bg-neutral-800" />
                        <Skeleton className="h-3 w-16 bg-neutral-800" />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Skeleton className="h-3 w-20 bg-neutral-800" />
                        <Skeleton className="h-6 w-16 rounded-md bg-neutral-800" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">Failed to load. {String((error as Error)?.message)}</div>
          <button 
            onClick={() => refetch()} 
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TokenColumn
            category="new"
            tokens={newPairs}
            liveData={liveData}
            onUpdateLiveData={handleUpdateLiveData}
          />
          <TokenColumn
            category="final"
            tokens={finalStretch}
            liveData={liveData}
            onUpdateLiveData={handleUpdateLiveData}
          />
          <TokenColumn
            category="migrated"
            tokens={migrated}
            liveData={liveData}
            onUpdateLiveData={handleUpdateLiveData}
          />
        </div>
      )}

      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </section>
  )
}
