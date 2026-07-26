export type WorkCatalogLink = Readonly<{
  label: string;
  href: string;
}>;

export type WorkCatalogItem = Readonly<{
  id: string;
  field: string;
  name: string;
  description: string;
  signal: string;
  links: readonly WorkCatalogLink[];
  lead?: boolean;
}>;

export type WorkCatalogGroup = Readonly<{
  id: string;
  label: string;
  title: string;
  description: string;
  items: readonly WorkCatalogItem[];
}>;

export const WORK_CATALOG: readonly WorkCatalogGroup[] = [
  {
    id: "haya-products",
    label: "Haya Inc. · Products",
    title: "Products and public platforms",
    description:
      "AI adoption, browser-native software, publishing, education, and the infrastructure that makes those products dependable.",
    items: [
      {
        id: "prooflock-index",
        field: "PR verification integrity",
        name: "ProofLock",
        description:
          "A live GitHub App that prevents pull requests from silently weakening the checks, workflows, and policy used to prove they are safe.",
        signal: "Haya Inc. · Featured above",
        lead: true,
        links: [
          {
            label: "Open product",
            href: "https://prooflock.yusuke-hayashi.com/",
          },
          {
            label: "Live status",
            href: "https://prooflock.yusuke-hayashi.com/status/v1.json",
          },
        ],
      },
      {
        id: "deban",
        field: "Opportunity discovery",
        name: "DEBAN / 出番",
        description:
          "A web service that turns the feeling of wanting to do something into small challenges people can discover, try on, and join.",
        signal: "Haya Inc. · Live product · Cloudflare",
        links: [
          {
            label: "Open product",
            href: "https://deban.yusuke8h.workers.dev/",
          },
        ],
      },
      {
        id: "civic-contribution-catalog",
        field: "Civic contribution platform",
        name: "Civic Contribution Catalog",
        description:
          "A structured catalog where people and AI agents can discover public-contribution opportunities, prepare useful deliverables, and act with policy and evidence attached.",
        signal: "Haya Inc. · Live service · Agent-ready",
        links: [
          {
            label: "Open catalog",
            href: "https://civic.haya-inc.co.jp/",
          },
        ],
      },
      {
        id: "ai-partners",
        field: "AI adoption directory",
        name: "AI伴走パートナーズ",
        description:
          "A public directory for finding and comparing AI adoption partners by service, technology, industry, company size, and region.",
        signal: "Haya Inc. · Live directory",
        links: [
          {
            label: "Open directory",
            href: "https://ai-partners.info/",
          },
        ],
      },
      {
        id: "ai-demand",
        field: "AI opportunity index",
        name: "AI Demand",
        description:
          "A searchable index of publicly available Japanese jobs and projects for AI adoption and implementation support.",
        signal: "Haya Inc. · Live service",
        links: [
          {
            label: "Search opportunities",
            href: "https://demand.ai-partners.info/",
          },
        ],
      },
      {
        id: "haya-inc",
        field: "Company platform",
        name: "haya株式会社",
        description:
          "The public home for an AI adoption and business-systems practice, from first consultation through implementation and operation.",
        signal: "Haya Inc. · Company",
        links: [
          {
            label: "Visit company",
            href: "https://haya-inc.co.jp/",
          },
        ],
      },
      {
        id: "wiki-shindanshi",
        field: "Learning system",
        name: "中小企業診断士 wiki",
        description:
          "A learning wiki that organizes the certification system and first- and second-stage exam topics into a navigable reference.",
        signal: "Haya Inc. · Knowledge",
        links: [
          {
            label: "Open wiki",
            href: "https://shindanshi.haya.company/",
          },
          {
            label: "Source",
            href: "https://github.com/haya-inc/wiki-shindanshi",
          },
        ],
      },
      {
        id: "wasmhatch-index",
        field: "Browser-native AI",
        name: "WasmHatch",
        description:
          "An AI assistant that works entirely in the browser, with visible and undoable changes and no server-side document access.",
        signal: "Haya Inc. · Featured above",
        links: [
          {
            label: "Open product",
            href: "https://wasmhatch.com/",
          },
          {
            label: "Source",
            href: "https://github.com/haya-inc/wasmhatch",
          },
        ],
      },
      {
        id: "hayasend",
        field: "Email infrastructure",
        name: "HayaSend",
        description:
          "Resend-compatible, AWS-native email infrastructure that keeps delivery, metadata, and operational control in the user’s account.",
        signal: "Haya Inc. · Early alpha",
        links: [
          {
            label: "Source",
            href: "https://github.com/haya-inc/hayasend",
          },
        ],
      },
      {
        id: "clawsembly",
        field: "Browser agent runtime",
        name: "Clawsembly",
        description:
          "An evidence-gated embedding boundary for running upstream OpenClaw browser-locally with explicit capabilities and compatibility proofs.",
        signal: "Haya Inc. · Security",
        links: [
          {
            label: "Documentation",
            href: "https://haya-inc.github.io/clawsembly/",
          },
          {
            label: "Source",
            href: "https://github.com/haya-inc/clawsembly",
          },
        ],
      },
      {
        id: "clawsembly-kernel",
        field: "Browser execution kernel",
        name: "Clawsembly Kernel",
        description:
          "An open, self-hostable kernel for running the exact unmodified OpenClaw release entirely inside a browser.",
        signal: "Haya Inc. · Open source",
        links: [
          {
            label: "Source",
            href: "https://github.com/haya-inc/clawsembly-kernel",
          },
        ],
      },
    ],
  },
  {
    id: "haya-knowledge",
    label: "Haya Inc. · Practice",
    title: "Knowledge and engineering systems",
    description:
      "Reusable foundations for teaching engineering and turning source material into maintained knowledge, discovery, and operational context.",
    items: [
      {
        id: "engineering-bootcamp",
        field: "Engineering education",
        name: "Engineering Bootcamp",
        description:
          "A practical curriculum that connects the purpose of a change to implementation, evidence, and verification.",
        signal: "Haya Inc. · Curriculum",
        links: [
          {
            label: "Source",
            href: "https://github.com/haya-inc/engineering-bootcamp",
          },
        ],
      },
      {
        id: "wiki-kit",
        field: "Repository-native knowledge",
        name: "Wiki Kit",
        description:
          "A maintainable knowledge-base template designed for continuous collaboration between people and language models.",
        signal: "Haya Inc. · Template",
        links: [
          {
            label: "Source",
            href: "https://github.com/haya-inc/wiki-kit-template",
          },
        ],
      },
      {
        id: "create-wiki-kit",
        field: "Project scaffolding",
        name: "create-wiki-kit",
        description:
          "A focused project generator that turns the Wiki Kit foundation into a repeatable starting point.",
        signal: "Haya Inc. · Open source",
        links: [
          {
            label: "Source",
            href: "https://github.com/haya-inc/create-wiki-kit",
          },
        ],
      },
      {
        id: "knowledge-kit",
        field: "Structured knowledge",
        name: "Knowledge Kit",
        description:
          "A repository-native workflow for shaping raw material into maintained and reusable organizational knowledge.",
        signal: "Haya Inc. · Template",
        links: [
          {
            label: "Source",
            href: "https://github.com/haya-inc/knowledge-kit-template",
          },
        ],
      },
      {
        id: "create-knowledge-kit",
        field: "Project scaffolding",
        name: "create-knowledge-kit",
        description:
          "A project generator for creating a consistent Knowledge Kit workspace without hand-copying its structure.",
        signal: "Haya Inc. · Open source",
        links: [
          {
            label: "Source",
            href: "https://github.com/haya-inc/create-knowledge-kit",
          },
        ],
      },
      {
        id: "discovery-kit",
        field: "Evidence-led discovery",
        name: "Discovery Kit",
        description:
          "A structured workspace for moving from an open question through evidence, decisions, and durable findings.",
        signal: "Haya Inc. · Template",
        links: [
          {
            label: "Source",
            href: "https://github.com/haya-inc/discovery-kit-template",
          },
        ],
      },
      {
        id: "create-discovery-kit",
        field: "Project scaffolding",
        name: "create-discovery-kit",
        description:
          "A project generator for starting evidence-led discovery work from a maintained common foundation.",
        signal: "Haya Inc. · Open source",
        links: [
          {
            label: "Source",
            href: "https://github.com/haya-inc/create-discovery-kit",
          },
        ],
      },
    ],
  },
  {
    id: "open-source-ecosystems",
    label: "Open source · Ecosystems",
    title: "Systems that grow beyond one repository",
    description:
      "Connected components for Python applications, authentication, MCP, OpenAPI, client-side Fetch, and repeatable project creation.",
    items: [
      {
        id: "hayate-index",
        field: "Python web framework",
        name: "hayate",
        description:
          "A standards-first Python application model built around ASGI, Web Workers, and the browser platform.",
        signal: "Hayate · Featured above",
        links: [
          {
            label: "Source",
            href: "https://github.com/hayatepy/hayate",
          },
        ],
      },
      {
        id: "hayate-auth",
        field: "Authentication",
        name: "hayate-auth",
        description:
          "Authentication primitives for Hayate applications, including OAuth 2.1, passkeys, and API keys.",
        signal: "Hayate · Open source",
        links: [
          {
            label: "Source",
            href: "https://github.com/hayatepy/hayate-auth",
          },
        ],
      },
      {
        id: "hayate-mcp",
        field: "Model Context Protocol",
        name: "hayate-mcp",
        description:
          "A Streamable HTTP and OAuth resource-server integration for exposing Hayate applications through MCP.",
        signal: "Hayate · Open source",
        links: [
          {
            label: "Source",
            href: "https://github.com/hayatepy/hayate-mcp",
          },
        ],
      },
      {
        id: "hayate-openapi",
        field: "API contracts",
        name: "hayate-openapi",
        description:
          "OpenAPI 3.1 generation and TypeScript type infrastructure for keeping application contracts portable.",
        signal: "Hayate · Open source",
        links: [
          {
            label: "Source",
            href: "https://github.com/hayatepy/hayate-openapi",
          },
        ],
      },
      {
        id: "hayate-fetch",
        field: "Web-standard client",
        name: "hayate-fetch",
        description:
          "A shared WHATWG Fetch client that keeps server and browser interactions aligned with the web platform.",
        signal: "Hayate · Open source",
        links: [
          {
            label: "Source",
            href: "https://github.com/hayatepy/hayate-fetch",
          },
        ],
      },
      {
        id: "create-hayate",
        field: "Project scaffolding",
        name: "create-hayate",
        description:
          "A project generator for starting ASGI, Worker, and MCP-capable Hayate applications from proven foundations.",
        signal: "Hayate · Open source",
        links: [
          {
            label: "Source",
            href: "https://github.com/hayatepy/create-hayate",
          },
        ],
      },
    ],
  },
  {
    id: "public-systems",
    label: "Independent · Products & systems",
    title: "Public services and software",
    description:
      "Independent public products and services, followed by developer systems, translation infrastructure, interactive computation, and this site itself.",
    items: [
      {
        id: "firsthand",
        field: "Evidence-backed job platform",
        name: "Firsthand",
        description:
          "A live Japanese job-search service built from employers’ official career pages, with source links, freshness, change history, and evidence attached.",
        signal: "Cloudflare · Live service",
        links: [
          {
            label: "Search jobs",
            href: "https://firsthand.work/",
          },
        ],
      },
      {
        id: "public-data-catalog-index",
        field: "Verifiable public data",
        name: "Public Data Catalog",
        description:
          "Japanese-first, tested retrieval recipes that take people and AI agents from a concrete question to a reproducible, attributable public-data result.",
        signal: "MCP · Open source",
        links: [
          {
            label: "Open catalog",
            href: "https://public-data-catalog-mcp.yusuke8h.workers.dev/",
          },
          {
            label: "Source",
            href: "https://github.com/yhay81/public-data-catalog",
          },
        ],
      },
      {
        id: "socialname",
        field: "Identity observability",
        name: "SocialName",
        description:
          "A local-first system that turns public-identifier presence and change into evidence-backed observations without treating a matching username as an identity claim.",
        signal: "Rust · Tauri · Active development",
        links: [
          {
            label: "Source",
            href: "https://github.com/yhay81/socialname",
          },
        ],
      },
      {
        id: "pylopdf-index",
        field: "Python + Rust",
        name: "pylopdf",
        description:
          "A compact Python API for editing, rendering, extracting, and generating PDFs, backed by a Rust core and shipped as small wheels.",
        signal: "PyPI · Featured above",
        links: [
          {
            label: "Documentation",
            href: "https://yhay81.github.io/pylopdf/",
          },
          {
            label: "Source",
            href: "https://github.com/yhay81/pylopdf",
          },
        ],
      },
      {
        id: "foliomcp",
        field: "Semantic document platform",
        name: "FolioMCP",
        description:
          "A full-stack workspace for uploading, organizing, and semantically searching documents, then exposing the resulting knowledge through managed MCP servers.",
        signal: "Private product · Cloudflare Access · MCP",
        links: [
          {
            label: "Open private product",
            href: "https://folio-mcp.com/",
          },
        ],
      },
      {
        id: "gh-freshclone",
        field: "Developer infrastructure",
        name: "gh-freshclone",
        description:
          "Compiles and proves the fastest trustworthy baseline for an unfamiliar repository in an isolated container, then records reusable evidence.",
        signal: "Python · Containers · Evidence receipts",
        links: [
          {
            label: "Source",
            href: "https://github.com/yhay81/gh-freshclone",
          },
        ],
      },
      {
        id: "ja-translation-todo",
        field: "Translation infrastructure",
        name: "ja-translation-todo",
        description:
          "A public registry for safely discovering, verifying, and coordinating Japanese OSS translation work across people and AI agents.",
        signal: "Web · REST · OpenAPI · MCP",
        links: [
          {
            label: "Open service",
            href: "https://ja.yusuke-hayashi.com",
          },
          {
            label: "Source",
            href: "https://github.com/yhay81/ja-translation-todo",
          },
        ],
      },
      {
        id: "gaslacker",
        field: "Google Apps Script",
        name: "GASlacker",
        description:
          "A zero-dependency Slack Web API client for Google Apps Script with broad API coverage, retries, uploads, and OAuth.",
        signal: "TypeScript · 168 API methods",
        links: [
          {
            label: "Documentation",
            href: "https://yhay81.github.io/GASlacker/",
          },
          {
            label: "Source",
            href: "https://github.com/yhay81/GASlacker",
          },
        ],
      },
      {
        id: "code-sortings",
        field: "Interactive experiment",
        name: "Code Sortings",
        description:
          "Sorting algorithms run in Python through Pyodide and a Web Worker, then become an interactive visual execution trace.",
        signal: "Python · Pyodide · TypeScript",
        links: [
          {
            label: "Open experiment",
            href: "https://sort.yusuke-hayashi.com",
          },
          {
            label: "Source",
            href: "https://github.com/yhay81/code-sortings",
          },
        ],
      },
      {
        id: "yomiage-kun",
        field: "Local-first desktop",
        name: "Yomiage-kun",
        description:
          "A desktop app that reads Discord text channels into voice through local Japanese speech engines, without a hosted intermediary.",
        signal: "Rust · Tauri 2 · Discord Voice",
        links: [
          {
            label: "Download",
            href: "https://github.com/yhay81/yomiage-kun/releases",
          },
          {
            label: "Source",
            href: "https://github.com/yhay81/yomiage-kun",
          },
        ],
      },
      {
        id: "profile-site",
        field: "Verifiable publishing",
        name: "This site",
        description:
          "A profile and publishing system built with Astro, web-platform navigation, reproducible releases, Sigstore, and SLSA provenance.",
        signal: "Astro · Web standards · Supply chain",
        links: [
          {
            label: "Source",
            href: "https://github.com/yhay81/profile",
          },
        ],
      },
    ],
  },
  {
    id: "earlier-work",
    label: "Archive · Earlier work",
    title: "Earlier explorations and contributions",
    description:
      "Smaller systems and sustained contributions that show where the current work came from.",
    items: [
      {
        id: "github-issues-wasm",
        field: "2023 · Browser experiment",
        name: "GitHub Issues × Rust WebAssembly",
        description:
          "A browser experiment that compiles Rust to WebAssembly and displays GitHub issues.",
        signal: "Rust · WebAssembly",
        links: [
          {
            label: "Source",
            href: "https://github.com/yhay81/github-issues-with-rust-webassembly",
          },
        ],
      },
      {
        id: "pythonic-peano-arithmetic",
        field: "2018–2025 · Mathematics",
        name: "Pythonic Peano Arithmetic",
        description:
          "An executable exploration of building algebra from the Peano axioms.",
        signal: "Python · Executable proof",
        links: [
          {
            label: "Source",
            href: "https://github.com/yhay81/pythonic-peano-arithmetic",
          },
        ],
      },
      {
        id: "frontend-handbook-ja",
        field: "2018 · Translation",
        name: "Front-end Interview Handbook · Japanese",
        description:
          "A sustained series of merged contributions that completed and maintained the Japanese translation.",
        signal: "Open source · Documentation",
        links: [
          {
            label: "Merged work",
            href: "https://github.com/yangshun/front-end-interview-handbook/pulls?q=is%3Apr+author%3Ayhay81+is%3Amerged",
          },
        ],
      },
      {
        id: "sesforwader",
        field: "2018 · Email utility",
        name: "sesforwader",
        description:
          "A small Python package for forwarding email received through Amazon SES.",
        signal: "Python · AWS SES",
        links: [
          {
            label: "Source",
            href: "https://github.com/yhay81/sesforwader",
          },
        ],
      },
    ],
  },
] as const satisfies readonly WorkCatalogGroup[];

export const WORK_CATALOG_COUNT = WORK_CATALOG.reduce(
  (total, group) => total + group.items.length,
  0,
);
