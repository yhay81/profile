export type CodeTokenKind =
  | "comment"
  | "command"
  | "keyword"
  | "number"
  | "operator"
  | "option"
  | "string"
  | "url"
  | "variable";

export interface CodeToken {
  readonly kind?: CodeTokenKind;
  readonly value: string;
}

const BASH_LANGUAGES = new Set(["bash", "sh", "shell", "zsh"]);
const BASH_KEYWORDS = new Set([
  "case",
  "do",
  "done",
  "elif",
  "else",
  "esac",
  "fi",
  "for",
  "function",
  "if",
  "in",
  "select",
  "then",
  "until",
  "while",
]);

const pushToken = (
  tokens: CodeToken[],
  value: string,
  kind?: CodeTokenKind,
) => {
  if (value === "") return;
  const previous = tokens.at(-1);
  if (previous && previous.kind === kind) {
    tokens[tokens.length - 1] = {
      kind,
      value: previous.value + value,
    };
    return;
  }
  tokens.push({ kind, value });
};

const readQuoted = (line: string, start: number) => {
  const quote = line[start];
  let cursor = start + 1;
  while (cursor < line.length) {
    if (line[cursor] === "\\" && quote === '"') {
      cursor += 2;
      continue;
    }
    if (line[cursor] === quote) return cursor + 1;
    cursor += 1;
  }
  return line.length;
};

const tokenizeBashLine = (line: string): CodeToken[] => {
  const tokens: CodeToken[] = [];
  let cursor = 0;
  let expectsCommand = true;

  while (cursor < line.length) {
    const rest = line.slice(cursor);

    const whitespace = rest.match(/^\s+/u)?.[0];
    if (whitespace) {
      pushToken(tokens, whitespace);
      cursor += whitespace.length;
      continue;
    }

    if (line[cursor] === "#") {
      pushToken(tokens, rest, "comment");
      break;
    }

    if (line[cursor] === "'" || line[cursor] === '"') {
      const end = readQuoted(line, cursor);
      pushToken(tokens, line.slice(cursor, end), "string");
      cursor = end;
      expectsCommand = false;
      continue;
    }

    const url = rest.match(/^https?:\/\/[^\s'"<>]+/u)?.[0];
    if (url) {
      pushToken(tokens, url, "url");
      cursor += url.length;
      expectsCommand = false;
      continue;
    }

    const variable = rest.match(
      /^\$(?:\{[A-Za-z_][\w]*\}|[A-Za-z_][\w]*)/u,
    )?.[0];
    if (variable) {
      pushToken(tokens, variable, "variable");
      cursor += variable.length;
      expectsCommand = false;
      continue;
    }

    const option = rest.match(/^--?[A-Za-z][\w-]*/u)?.[0];
    if (option) {
      pushToken(tokens, option, "option");
      cursor += option.length;
      expectsCommand = false;
      continue;
    }

    const number = rest.match(/^\d+(?:\.\d+)?/u)?.[0];
    if (number) {
      pushToken(tokens, number, "number");
      cursor += number.length;
      expectsCommand = false;
      continue;
    }

    const operator = rest.match(/^(&&|\|\||>>|<<|\$\(|[|;&()<>\\=])/u)?.[0];
    if (operator) {
      pushToken(tokens, operator, "operator");
      cursor += operator.length;
      expectsCommand = ["&&", "||", "|", ";", "$("].includes(operator);
      continue;
    }

    const word = rest.match(/^[^\s'"$#|&;()<>\\=]+/u)?.[0];
    if (word) {
      const isAssignment = line[cursor + word.length] === "=";
      const kind = isAssignment
        ? "variable"
        : BASH_KEYWORDS.has(word)
          ? "keyword"
          : expectsCommand
            ? "command"
            : undefined;
      pushToken(tokens, word, kind);
      cursor += word.length;
      expectsCommand = false;
      continue;
    }

    pushToken(tokens, line[cursor]);
    cursor += 1;
  }

  return tokens;
};

export const highlightCode = (
  code: string,
  language: string,
): readonly CodeToken[] => {
  const normalizedLanguage = language.split(/[ ·]/u, 1)[0].trim().toLowerCase();
  if (!BASH_LANGUAGES.has(normalizedLanguage)) return [{ value: code }];

  const lines = code.split("\n");
  return lines.flatMap((line, index) => {
    const tokens = tokenizeBashLine(line);
    if (index < lines.length - 1) tokens.push({ value: "\n" });
    return tokens;
  });
};
