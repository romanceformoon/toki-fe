const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@mui/x-charts"],
  async rewrites() {
    return [
      {
        source: "/toki-api/:path*",
        destination: `http://localhost:9876/toki-api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
