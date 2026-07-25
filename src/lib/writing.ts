import zennWriting from "@/data/zenn-writing.json";
import { LOCAL_ARTICLES } from "@/lib/articles";

// サイト内記事と、公式 RSS から同期した Zenn の公開物を新しい順に並べる。
export interface WritingEntry {
  readonly date: string; // YYYY-MM-DD
  readonly title: string;
  readonly url: string;
  readonly external: boolean;
}

const LOCAL_WRITING: readonly WritingEntry[] = LOCAL_ARTICLES.map(
  (article) => ({
    date: article.datePublished.slice(0, 10),
    title: article.title,
    url: article.url,
    external: false,
  }),
);

const externalWriting = zennWriting.entries satisfies readonly WritingEntry[];

export const WRITING: readonly WritingEntry[] = [
  ...LOCAL_WRITING,
  ...externalWriting,
].sort((left, right) => right.date.localeCompare(left.date));
