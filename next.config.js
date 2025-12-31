/** @type {import('next').NextConfig} */
const path = require("path");
const runtimeCaching = require("next-pwa/cache");

const IS_PROD = process.env.NODE_ENV === "production";

const withPwa = require("next-pwa")({
  dest: "public",
  runtimeCaching,
  disable: !IS_PROD,
});

const nextConfig = withPwa({
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
});

module.exports = {
  ...nextConfig,
};
