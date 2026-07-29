import { fa } from "./fa";

export const DIR = "rtl" as const;
export const LANG = "fa" as const;

export function t<K extends keyof typeof fa>(section: K): (typeof fa)[K];
export function t(path: string): string {
  const parts = path.split(".");
  let cur: unknown = fa;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as object)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}

export { fa };
