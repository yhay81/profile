/** @type {import('next').NextConfig} */
const path = require("path");
const runtimeCaching = require("next-pwa/cache");

const IS_PROD = process.env.NODE_ENV === "production";

const withPwa = require("next-pwa")({
  dest: "public",
  runtimeCaching,
  disable: !IS_PROD,
});

const nextConfig = {
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  swcMinify: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = withPwa(nextConfig);
