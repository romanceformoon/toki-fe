const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@mui/x-charts"],
  async rewrites() {
    return [
      {
        source: "/toki-api/:path*",
        destination: `http://132.226.226.167:9999/toki-api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
