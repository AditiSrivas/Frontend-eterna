import { TokenDiscovery } from '@/components/token/TokenDiscovery'

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 md:px-6 lg:px-10 py-6">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Pulse</h1>
          <p className="text-sm md:text-base text-neutral-400">Live discovery of trending tokens across chains</p>
        </header>
        <TokenDiscovery />
      </div>
    </main>
  )
}


