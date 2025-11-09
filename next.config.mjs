/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-tooltip',
      '@radix-ui/react-popover',
      '@radix-ui/react-dialog'
    ]
  },
  images: { remotePatterns: [] }
}

export default nextConfig


