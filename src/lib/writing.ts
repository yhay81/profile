import zennWriting from "@/data/zenn-writing.json";

// サイト内記事と、公式 RSS から同期した Zenn の公開物を新しい順に並べる。
export interface WritingEntry {
  readonly date: string; // YYYY-MM-DD
  readonly title: string;
  readonly url: string;
  readonly external: boolean;
}

const LOCAL_WRITING: readonly WritingEntry[] = [
  {
    date: "2026-07-25",
    title: "A Personal Trust Control Plane",
    url: "/trust-control-plane",
    external: false,
  },
];

const externalWriting = zennWriting.entries satisfies readonly WritingEntry[];

export const WRITING: readonly WritingEntry[] = [
  ...LOCAL_WRITING,
  ...externalWriting,
].sort((left, right) => right.date.localeCompare(left.date));
