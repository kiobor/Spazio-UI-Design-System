import fs from "fs";
import path from "path";

const TOKENS_PATH = path.resolve("src/tokens/tokens.json");
const OUT_DIR = path.resolve("src/tokens/generated");

interface TokenValue {
  value: string;
  type: string;
}

type TokenGroup = {
  [key: string]: TokenValue | TokenGroup;
};

function isTokenValue(obj: unknown): obj is TokenValue {
  return typeof obj === "object" && obj !== null && "value" in obj && "type" in obj;
}

function resolveReference(value: string, tokens: TokenGroup): string {
  const refMatch = value.match(/^\{(.+)\}$/);
  if (!refMatch) return value;

  const refPath = refMatch[1].split(".");
  let current: unknown = tokens;
  for (const segment of refPath) {
    if (typeof current !== "object" || current === null) return value;
    current = (current as Record<string, unknown>)[segment];
  }
  if (isTokenValue(current)) return resolveReference(current.value, tokens);
  return value;
}

function flattenTokens(
  obj: TokenGroup,
  prefix: string,
  tokens: TokenGroup,
): Array<{ path: string; value: string; type: string }> {
  const result: Array<{ path: string; value: string; type: string }> = [];

  for (const [key, val] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}-${key}` : key;
    if (isTokenValue(val)) {
      result.push({
        path: currentPath,
        value: resolveReference(val.value, tokens),
        type: val.type,
      });
    } else {
      result.push(...flattenTokens(val as TokenGroup, currentPath, tokens));
    }
  }

  return result;
}

function generateCSS(flatTokens: Array<{ path: string; value: string }>): string {
  const vars = flatTokens.map((t) => `  --spazio-${t.path}: ${t.value};`).join("\n");
  return `:root {\n${vars}\n}\n`;
}

function generateTailwindExtension(
  flatTokens: Array<{ path: string; value: string; type: string }>,
): string {
  const colors: Record<string, string> = {};
  const spacing: Record<string, string> = {};
  const borderRadius: Record<string, string> = {};
  const fontSize: Record<string, string> = {};
  const fontWeight: Record<string, string> = {};
  const boxShadow: Record<string, string> = {};

  for (const token of flatTokens) {
    const cssVar = `var(--spazio-${token.path})`;
    const name = token.path.replace(/^(color-semantic-|color-primitive-|spacing-|borderRadius-|fontSize-|fontWeight-|shadow-)/, "");

    switch (token.type) {
      case "color":
        if (token.path.startsWith("color-semantic-")) {
          colors[name] = cssVar;
        }
        break;
      case "spacing":
        spacing[name] = cssVar;
        break;
      case "borderRadius":
        borderRadius[name] = cssVar;
        break;
      case "fontSize":
        fontSize[name] = cssVar;
        break;
      case "fontWeight":
        fontWeight[name] = cssVar;
        break;
      case "boxShadow":
        boxShadow[name] = cssVar;
        break;
    }
  }

  return `export const spazioTheme = {
  colors: ${JSON.stringify(colors, null, 4)},
  spacing: ${JSON.stringify(spacing, null, 4)},
  borderRadius: ${JSON.stringify(borderRadius, null, 4)},
  fontSize: ${JSON.stringify(fontSize, null, 4)},
  fontWeight: ${JSON.stringify(fontWeight, null, 4)},
  boxShadow: ${JSON.stringify(boxShadow, null, 4)},
} as const;
`;
}

function main() {
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, "utf-8")) as TokenGroup;
  const flat = flattenTokens(tokens, "", tokens);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "variables.css"), generateCSS(flat));
  fs.writeFileSync(path.join(OUT_DIR, "tailwind.ts"), generateTailwindExtension(flat));

  console.log(`Generated ${flat.length} tokens → variables.css + tailwind.ts`);
}

main();
