"use client"
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
      <p className="text-neutral-400 text-sm">{error.message}</p>
      <button onClick={() => reset()} className="mt-2 px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Try again</button>
    </div>
  )
}


