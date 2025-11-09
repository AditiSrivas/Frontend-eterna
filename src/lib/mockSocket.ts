type Listener = (data: unknown) => void

export class MockPriceSocket {
  private intervalId: number | null = null
  private listeners: Record<string, Listener[]> = {}
  private prices: Record<string, number>

  constructor(tokenIds: string[], basePrices: Record<string, number>) {
    this.prices = { ...basePrices }
    if (typeof window !== 'undefined') {
      this.start(tokenIds)
    }
  }

  private start(tokenIds: string[]) {
    this.intervalId = window.setInterval(() => {
      const updates = tokenIds.map((id) => {
        const prev = this.prices[id] ?? 1
        const delta = (Math.random() - 0.5) * Math.max(0.005, Math.min(0.05, prev * 0.001))
        const next = Math.max(0.000001, +(prev + delta).toFixed(6))
        this.prices[id] = next
        return { id, price: next }
      })
      this.emit('price', updates)
    }, 1200)
  }

  on(event: 'price', cb: Listener) {
    this.listeners[event] ??= []
    this.listeners[event].push(cb)
  }

  off(event: 'price', cb: Listener) {
    this.listeners[event] = (this.listeners[event] ?? []).filter((l) => l !== cb)
  }

  private emit(event: 'price', data: unknown) {
    for (const l of this.listeners[event] ?? []) l(data)
  }

  dispose() {
    if (this.intervalId) window.clearInterval(this.intervalId)
    this.listeners = {}
  }
}


