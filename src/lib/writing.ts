import zennWriting from "@/data/zenn-writing.json";
import { LOCAL_ARTICLES } from "@/lib/articles";

// Combine local articles with the official Zenn RSS snapshot in newest-first order.
export interface WritingEntry {
  readonly date: string; // YYYY-MM-DD
  readonly title: string;
  readonly url: string;
  readonly external: boolean;
  readonly language: "en" | "ja";
  readonly transitionName?: `article-${string}`;
}

const LOCAL_WRITING: readonly WritingEntry[] = LOCAL_ARTICLES.map(
  (article) => ({
    date: article.datePublished.slice(0, 10),
    title: article.title,
    url: article.url,
    external: false,
    language: "en",
    transitionName: article.transitionName,
  }),
);

const JAPANESE_SCRIPT =
  /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;

const externalWriting: readonly WritingEntry[] = zennWriting.entries.map(
  (entry) => ({
    ...entry,
    language: JAPANESE_SCRIPT.test(entry.title) ? "ja" : "en",
  }),
);

export const WRITING: readonly WritingEntry[] = [
  ...LOCAL_WRITING,
  ...externalWriting,
].sort((left, right) => right.date.localeCompare(left.date));
