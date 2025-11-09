import { TokenDiscovery } from '@/components/token/TokenDiscovery'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-2 md:px-4 lg:px-6 py-6 pb-20">
        <div className="mx-auto max-w-[1600px]">
          <header className="mb-6 md:mb-8 px-2 md:px-0">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Pulse</h1>
            <p className="text-sm md:text-base text-neutral-400">Live discovery of trending tokens across chains</p>
          </header>
          <TokenDiscovery />
        </div>
      </main>
      <Footer />
    </>
  )
}


