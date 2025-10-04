/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // This fixes Windows path issues with non-ASCII characters
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-win32-x64-msvc',
        'node_modules/next/dist/compiled/@napi-rs',
      ],
    },
  },
  // Disable file system cache during build
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}

export default nextConfig;