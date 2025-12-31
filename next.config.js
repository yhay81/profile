/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  turbopack: {},
};

module.exports = nextConfig;
