// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://yusuke-hayashi.com",
  // Markdown is not used here; disabling Shiki keeps Astro's native CSP free
  // from an irrelevant inline-style compatibility warning.
  markdown: {
    syntaxHighlight: false,
  },
  security: {
    csp: {
      algorithm: "SHA-256",
      directives: [
        "default-src 'none'",
        "base-uri 'none'",
        "connect-src 'self'",
        "font-src 'none'",
        "form-action 'none'",
        "img-src 'self' data:",
        "manifest-src 'self'",
        "object-src 'none'",
        "require-trusted-types-for 'script'",
        "trusted-types 'none'",
        "worker-src 'self'",
        "upgrade-insecure-requests",
      ],
      // Astro 7.1: generated hashes are scoped to element directives while
      // inline event/style attributes remain categorically disabled.
      scriptDirective: {
        resources: [
          { resource: "'self'", kind: "element" },
          { resource: "'inline-speculation-rules'", kind: "element" },
          { resource: "'none'", kind: "attribute" },
        ],
      },
      styleDirective: {
        resources: [
          { resource: "'self'", kind: "element" },
          { resource: "'none'", kind: "attribute" },
        ],
      },
    },
  },
  // Emit file-form pages (such as keys.html) to preserve existing
  // extensionless URLs like /keys without a redirect.
  build: {
    format: "file",
    // For this small static site, always inlining CSS removes a render-blocking
    // round trip and improves LCP.
    inlineStylesheets: "always",
  },
});
