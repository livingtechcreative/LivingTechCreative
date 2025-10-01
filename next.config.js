/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR mode (menghapus output: 'export')
  trailingSlash: true,
  distDir: 'build',
  eslint: {
    // Ignore ESLint errors during builds (useful when tests/dev files have strict rules)
    ignoreDuringBuilds: true,
  },
  images: {
    // Mengaktifkan optimasi gambar untuk SSR
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dashboard.livingtechcreative.com',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
