const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ['@mui/x-charts'],
  async rewrites() {
    return [
      // data.json / header.json은 Vercel Blob 기반 API로 서빙 (없으면 GitHub 폴백)
      {
        source: '/table/aery/data.json',
        destination: '/api/table/aery/data.json'
      },
      {
        source: '/table/aery/header.json',
        destination: '/api/table/aery/header.json'
      },
      {
        source: '/table/aery7/data.json',
        destination: '/api/table/aery7/data.json'
      },
      {
        source: '/table/aery7/header.json',
        destination: '/api/table/aery7/header.json'
      }
    ]
  }
}

module.exports = nextConfig
