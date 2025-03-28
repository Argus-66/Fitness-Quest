/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
  typescript: {
    // Set this to false during deployment to avoid TypeScript errors stopping the build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Set this to false during deployment to avoid ESLint errors stopping the build
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Configure file resolution
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', ...config.resolve.extensions];
    return config;
  },
}

module.exports = nextConfig 