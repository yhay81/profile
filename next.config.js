/** @type {import('next').NextConfig} */
const path = require("path");

const IS_PROD = process.env.NODE_ENV === "production";

const CSP = {
  "connect-src": ["'self'", "https:"],
  "default-src": ["'self'"],
  "font-src": ["https:"],
  "frame-src": ["https:"],
  "img-src": ["'self'", "data:", "https:"],
  "manifest-src": ["'self'"],
  "media-src": ["'none'"],
  "object-src": ["'none'"],
  "prefetch-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-eval'", "https:", "'unsafe-inline'"],
  "style-src": ["'self'", "'unsafe-inline'", "https:"],
  "worker-src": ["'self'"],

  "base-uri": ["'none'"],

  "form-action": ["https:"],
  "frame-ancestors": ["'none'"],

  "report-uri": ["webvjp.uriports.com"],
  "report-to": ["default"],

  "block-all-mixed-content": [],
};

const HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1;mode=block" },
  { key: "SameSite", value: "None;Secure" },
  {
    key: "Report-To",
    value: JSON.stringify({
      group: "default",
      max_age: 10_886_400,
      endpoints: [{ url: "https://webvjp.uriports.com/reports" }],
      include_subdomains: true,
    }),
  },
  {
    key: "NEL",
    value: JSON.stringify({
      report_to: "default",
      max_age: 2_592_000,
      include_subdomains: true,
      failure_fraction: 1,
    }),
  },
  {
    key: "Expect-CT",
    value:
      'max-age=86400,report-uri="https://webvjp.uriports.com/reports/report"',
  },
  {
    key: "Permissions-Policy",
    value: [
      "geolocation=()",
      "microphone=()",
      "camera=()",
      "fullscreen=*",
      "payment=()",
    ].join(","),
  },
  {
    key: "Cross-Origin-Opener-Policy-Report-Only",
    value: `same-origin; report-to="default"`,
  },
  {
    key: "cache-control",
    value: "s-maxage=86400,stale-while-revalidate",
  },
];

if (IS_PROD) {
  HEADERS.push({
    key: "Content-Security-Policy-Report-Only",
    value: Object.entries(CSP)
      .map(([key, value]) => `${key} ${value.join(" ")}`)
      .join(";"),
  });
}

const immutableCacheControlHeader = [
  { key: "cache-control", value: "public,max-age=31536000,immutable" },
];

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
  headers: async () => [
    { headers: HEADERS, source: "/" },
    { headers: HEADERS, source: "/:path*" },
    {
      source: "/_next/static/(.*)",
      headers: immutableCacheControlHeader,
    },
    {
      source: "/(.*).js",
      headers: immutableCacheControlHeader,
    },
    {
      source: "/(.*).png",
      headers: immutableCacheControlHeader,
    },
    {
      source: "/(.*).svg",
      headers: immutableCacheControlHeader,
    },
    {
      source: "/(.*).webp",
      headers: immutableCacheControlHeader,
    },
    {
      source: "/(.*).xml",
      headers: immutableCacheControlHeader,
    },
    {
      source: "/(.*).ico",
      headers: immutableCacheControlHeader,
    },
    {
      source: "/site.webmanifest",
      headers: immutableCacheControlHeader,
    },
    {
      source: "/robots.txt",
      headers: immutableCacheControlHeader,
    },
  ],
};

module.exports = nextConfig;
