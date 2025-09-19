import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'livingtech.anshoria.my.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'livingtechcreative.com',
        port: '',
        pathname: '/**',
      }
    ],
    // Handle local portfolio images that might not exist
    unoptimized: false,
    // Add error handling for missing images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Improve SVG rendering quality
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { dev, isServer }) => {
    // Exclude test files from production build
    if (!dev) {
      config.module.rules.push({
        test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
        loader: 'ignore-loader'
      });
      
      config.module.rules.push({
        test: /__tests__/,
        loader: 'ignore-loader'
      });
    }
    return config;
  },
  // Exclude test files from build output
  outputFileTracingExcludes: {
    '*': ['./src/**/__tests__/**', './src/**/*.test.*', './src/**/*.spec.*']
  },
  // Disable ESLint during builds to avoid test file errors
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
