const isDevelopmentEnv = process.env.NODE_ENV === 'development'

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ['@mui/x-charts'],
  async rewrites() {
    return [
      {
        source: '/toki-api/:path*',
        destination: isDevelopmentEnv
          ? `${process.env.NEXT_PUBLIC_DEV}/toki-api/:path*`
          : `${process.env.NEXT_PUBLIC_PROD}/toki-api/:path*`
      },
      {
        source: '/table/:path*',
        destination: isDevelopmentEnv
          ? `${process.env.NEXT_PUBLIC_DEV}/toki-api/table/:path*`
          : `${process.env.NEXT_PUBLIC_PROD}/toki-api/table/:path*`
      }
    ]
  }
}

module.exports = nextConfig
