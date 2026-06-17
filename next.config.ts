import path from 'path'
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
]

const config: NextConfig = {
  turbopack: {
    // worktree is 3 levels below the monorepo root where node_modules lives
    root: path.resolve(__dirname, '../../..'),
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default config
