const isDevelopmentEnv = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ["@mui/x-charts"],
  async rewrites() {
    return [
      {
        source: "/toki-api/:path*",
        destination: isDevelopmentEnv
          ? `http://localhost:9999/toki-api/:path*`
          : `http://132.226.226.167:9999/toki-api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
