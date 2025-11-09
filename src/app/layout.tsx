import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/store/providers'

export const metadata: Metadata = {
  title: 'Token Discovery | Axiom-style Table',
  description: 'Pixel-perfect token discovery table clone with real-time updates',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
  },
  themeColor: '#0a0a0a'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}


