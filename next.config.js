const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ['@mui/x-charts'],
  async rewrites() {
    return [
      // 편집 대상 데이터(data.json)는 Vercel Blob 기반 API로 서빙
      {
        source: '/table/aery/data.json',
        destination: '/api/table/aery'
      },
      {
        source: '/table/aery7/data.json',
        destination: '/api/table/aery7'
      },
      // 그 외 테이블 정적 파일(header.json 등)은 기존 GitHub 원본 유지
      {
        source: '/table/:path*',
        destination:
          'https://raw.githubusercontent.com/romanceformoon/toki-be/refs/heads/main/table/:path*'
      }
    ]
  }
}

module.exports = nextConfig
