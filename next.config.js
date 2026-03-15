/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-require-imports */
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

/* eslint-enable @typescript-eslint/no-require-imports */
