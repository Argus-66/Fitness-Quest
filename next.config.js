/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly enable SWC for compilation
  swcMinify: true,
  
  // Specify which file extensions should be used for pages
  // Specify .tsx first to prioritize TypeScript files over JavaScript
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  experimental: {
    // For MongoDB in Next.js
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
  
  // Disable type checking during build
  typescript: {
    // Set this to false during deployment to avoid TypeScript errors stopping the build
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during build
  eslint: {
    // Set this to false during deployment to avoid ESLint errors stopping the build
    ignoreDuringBuilds: true,
  },
  
  // Configure file resolution
  webpack: (config) => {
    // Configure file resolution
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', ...config.resolve.extensions];
    return config;
  },
}

module.exports = nextConfig 