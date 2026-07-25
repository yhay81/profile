# profile

The source for [Yusuke Hayashi's profile site](https://yusuke-hayashi.com).

## Identity verification

The site publishes an OpenPGP-signed, machine-readable identity manifest at
[`/.well-known/identity.json`](https://yusuke-hayashi.com/.well-known/identity.json).
Its detached signature, revision history, schemas, and public verification CLI
are available under the same `.well-known` namespace.

```sh
gpg --locate-keys yusuke@haya.company
curl -sO https://yusuke-hayashi.com/.well-known/identity.json
curl -sO https://yusuke-hayashi.com/.well-known/identity.json.asc
gpg --verify identity.json.asc identity.json

curl -sO https://yusuke-hayashi.com/.well-known/verify-identity.mjs
node verify-identity.mjs
```

## Release integrity

The [release-integrity section](https://yusuke-hayashi.com/identity#release-integrity)
on `/identity` combines the source commit, reproducible-build provenance,
performance contract, and identity proofs in one verification surface.
Ordinary assets are verified by exact SHA-256 match. Because Cloudflare
prepends a managed policy to `robots.txt`, the verifier checks the byte length
and SHA-256 digest of its source-controlled suffix. The self-referential
`release.json` and deployment configuration are outside the asset set, but
remain covered by the archive attestation. The in-browser verifier is loaded
only when requested. The former `/integrity` URL permanently redirects to this
section.

The home page remains focused on the profile itself. Deeper identity and
release evidence is intentionally consolidated on `/identity`. The page
distinguishes build identity, artifact binding, and the public transparency
record while making the limits of Sigstore explicit: it proves the relationship
between a specific automation identity and specific bytes, not the truth of the
site's claims, the absence of vulnerabilities, or a person's identity.

```sh
node scripts/verify-release.mjs --base-url https://yusuke-hayashi.com
```

The machine-readable
[`release.json`](https://yusuke-hayashi.com/.well-known/release.json) and
[`performance.json`](https://yusuke-hayashi.com/.well-known/performance.json)
are generated deterministically on every build. The same build derives the CSP
hashes for inline scripts and styles, preventing unregistered inline code from
running in production. Astro also emits a page-level CSP with Trusted Types
enforcement and separate element/attribute directives.

## Technical approach

This is a static Astro site built with native CSS. It ships no framework
runtime, and its output is server-free HTML and CSS with a small set of
purpose-specific client scripts. Web-platform features are preferred over
application-level reimplementations:

- **Navigation:** CSS-only cross-document View Transitions (`@view-transition`)
  and the Speculation Rules API for internal-link prerendering. There is no SPA
  router.
- **Motion:** Scroll-driven Animations (`animation-timeline: view()`) for
  reveals and a CSS `steps()` typewriter effect. All motion is disabled under
  `prefers-reduced-motion`.
- **Color:** OKLCH design tokens with `color-mix()`-derived variants.
  `src/styles/tokens.css` is the single source of truth; Stylelint's
  `declaration-strict-value` rule rejects raw RGB and hex color literals.
- **Typography:** `system-ui` and `ui-monospace` only, avoiding font downloads,
  preloads, and render delays.
- **JavaScript:** Limited to the SIWE demo (with `viem` imported on demand),
  email copying, first-visit motion state, and the `/identity` verifier.
  Cryptographic code, including OpenPGP and `viem`, is not imported until
  verification starts. The site uses no framework runtime, analytics, or
  third-party scripts.
- **Performance contract:** The build enforces compressed HTML and initial
  JavaScript budgets for key routes, with zero third-party requests, web fonts,
  or RUM beacons.
- **Security headers:** The build derives a hash-based CSP. Cloudflare adds
  HSTS, COOP/CORP, Permissions Policy, `nosniff`, and clickjacking protection at
  the edge.
- **Dependency security:** pnpm holds new releases for 24 hours, fails closed
  when registry publication metadata is missing, audits moderate-and-higher
  advisories, rejects publish-trust downgrades, and verifies registry
  signatures in CI. A single version-specific exception covers
  `@astrojs/check`'s pre-provenance `chokidar@4.0.3` dependency. Peer
  dependencies are strict, with one package-scoped compatibility declaration
  for `eslint-plugin-jsx-a11y@6.10.2` on the tested ESLint 10 toolchain.
- **TypeScript transition:** Native TypeScript 7 performs project-wide CLI type
  checking, while the official TypeScript 6 compatibility package supplies the
  stable Compiler API still required by Astro and typescript-eslint. Both paths
  are exercised by `pnpm check`.

## Project structure

- `src/layouts/Base.astro` — Shared document shell, metadata, social cards, and
  Speculation Rules.
- `src/components/` — Reusable UI including `SectionHeader`, `CodeBlock`, and
  `TrustGraph`.
- `src/pages/` — `/` (Hero, About, Writing, and Contact), `/identity` (trust
  graph, release ledger, and browser verifier), `/keys`, `/proofs`, `/siwe`, and
  static feed/sitemap endpoints.
- `src/lib/site.ts` — Shared profile metadata, social links, and key
  fingerprints.
- `public/` — **Stable, externally referenced assets. Do not rename or move
  them:** `pgp-key.asc` and its timestamp, `.well-known/security.txt` and its
  timestamp, the signed identity manifest, revision history, verification CLI,
  Nostr metadata, and public identity proofs.
- `src/data/zenn-writing.json` — A generated snapshot of the official Zenn RSS
  feed. Article titles remain in their original publication language and are
  not repository documentation.

## Design

The visual system combines a dark navy foundation with a restrained neon-green
accent. Native OS fonts render immediately, a subtle grid adds depth, and
section numbers establish rhythm. Keyboard focus uses `:focus-visible`, and
Astro optimizes the profile image at build time.

## Development

```sh
pnpm install
pnpm dev                 # Start the local server at http://localhost:4321
pnpm build               # Build and verify the static site in dist/
pnpm verify:release      # Verify the deployed asset hashes and performance report
pnpm deploy:cloudflare   # Deploy the verified dist/ directory to Cloudflare
pnpm typecheck           # Type-check with the native TypeScript 7 compiler
pnpm check               # Run TypeScript, Astro, ESLint, Stylelint, and Prettier
pnpm fix                 # Apply supported automatic fixes
pnpm security:check      # Audit advisories and verify registry signatures
```

Husky and lint-staged run ESLint, Stylelint, and Prettier against staged files
before each commit.

## Deployment and provenance

The GitHub Actions workflow in `.github/workflows/cloudflare.yml` runs quality
checks and a dependency audit, verifies two reproducible builds, issues SLSA
artifact and SPDX SBOM attestations, and deploys directly to Cloudflare Workers
Static Assets. No Worker code runs on requests.

`build.format: "file"` and
`assets.html_handling: "drop-trailing-slash"` preserve extensionless URLs such
as `/keys` without redirects. The sitemap is a static endpoint at
`src/pages/sitemap.xml.ts` and is emitted at the `/sitemap.xml` URL referenced by
`robots.txt`.

The workflow packages the complete `dist/` directory into an archive with
fixed metadata, preserving `/.well-known` resources and ensuring that the
attested artifact is exactly what gets deployed. Hashed `/_astro/*` assets are
immutable for one year; HTML and stable identity-artifact URLs use Cloudflare's
standard revalidation behavior.

After deployment, CI verifies every asset in the release manifest, the
published identity CLI, security headers, and the absence of RUM. A separate
daily workflow monitors the deployed bytes and identity claims, including DNS.

CI builds the same commit twice and requires the SHA-256 digests of the
fixed-metadata `site-dist.tar.gz` archives to match. Builds from `main` receive
GitHub Artifact Attestations that bind the commit and workflow identity to the
artifact digest. Downloaded artifacts can be verified with:

```sh
gh attestation verify site-dist.tar.gz -R yhay81/profile
```

## References

- https://github.com/bchiang7/v4 (the starting point for the original design)
- https://realfavicongenerator.net/
