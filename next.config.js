/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Output standalone to make deployment more reliable
  output: 'standalone',
  // Skip all dependency checking
  experimental: {
    turbotrace: {
      // Skip all tracing of dependencies
      logLevel: 'error',
    },
  },
  // Enable webpack analyzer only in production for debugging
  webpack: (config, { isServer }) => {
    // Any webpack customization here
    return config;
  },
}

module.exports = nextConfig 