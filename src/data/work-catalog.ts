interface WorkCatalogItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly href: string;
  readonly collection: "cad" | "pdf" | "data" | "editor";
}

export const WORK_CATALOG = [
  {
    id: "zumen",
    name: "Zumen",
    description:
      "Read and write Japanese CAD drawings and BIM models, including JWW, SXF, and IFC. Python, JavaScript, and .NET applications share the same Rust core.",
    href: "https://zumen.dev/",
    collection: "cad",
  },
  {
    id: "pyropdf",
    name: "pyropdf",
    description:
      "Extract text and tables, render a page as an image, or edit a PDF from Python. Group edits in a transaction so they can be undone together.",
    href: "https://pyropdf.haya.works/",
    collection: "pdf",
  },
  {
    id: "parapdf",
    name: "ParaPDF",
    description:
      "Embed a PDF reader in a React app. It renders pages near the viewport as you scroll and supports text selection, search, and annotations.",
    href: "https://parapdf.yhay81.com/",
    collection: "pdf",
  },
  {
    id: "vastgrid",
    name: "VastGrid",
    description:
      "Open a large CSV or Parquet file as a spreadsheet and edit individual cells. Rows load as you scroll. The same grid runs in the browser, VS Code, and Jupyter.",
    href: "https://vastgrid.yhay81.com/",
    collection: "data",
  },
  {
    id: "sqrail",
    name: "sqrail",
    description:
      "Query local CSV, TSV, JSON, and Parquet files from the command line. Coding agents can join the files you specify with read-only SQL and get one JSON object per row.",
    href: "https://sqrail.yhay81.com/",
    collection: "data",
  },
  {
    id: "pdf-translation-viewer",
    name: "PDF Translation Viewer",
    description:
      "Shows the original page beside its translation, keeping figures, tables, and equations in place.",
    collection: "editor",
    href: "https://marketplace.visualstudio.com/items?itemName=yhay81.pdf-translation-viewer",
  },
  {
    id: "markdown-translation-preview",
    name: "Markdown Translation Preview",
    description:
      "Aligns each translated paragraph with its source and preserves code blocks and link targets.",
    collection: "editor",
    href: "https://marketplace.visualstudio.com/items?itemName=yhay81.markdown-translation-preview",
  },
  {
    id: "pptx-live-viewer",
    name: "PPTX Live Viewer",
    description:
      "Keeps the current slide in view when a script regenerates a PowerPoint file, so you can inspect changes as you work.",
    collection: "editor",
    href: "https://marketplace.visualstudio.com/items?itemName=yhay81.pptx-live-viewer",
  },
] as const satisfies readonly WorkCatalogItem[];
