import type { ReactNode } from "react";
import { t } from "../i18n";
import { getProductBySlug, productSlug } from "../products";

export const NAV_ITEMS = [
  { key: "home", label: t("nav.home") },
  { key: "about", label: t("nav.about") },
  { key: "products", label: t("nav.products") },
  { key: "events", label: t("nav.events") },
  { key: "journal", label: t("nav.journal") },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];

export const FOOTER_LINKS = [
  ["home", t("nav.home"), "services", t("nav.services")],
  ["about", t("nav.about"), "products", t("nav.products")],
  ["contact", t("nav.contact"), "events", t("nav.events")],
  ["process", t("nav.ourProcess"), "journal", t("nav.journal")],
] as const;

export const FONT_FAMILY = "'Modam', 'Vazirmatn', 'Helvetica Neue', Arial, sans-serif";

export type Page =
  | "home"
  | "contact"
  | "about"
  | "journal"
  | "article"
  | "products"
  | "product"
  | "events"
  | "event";

export type NavigateOptions = {
  category?: string;
};

export type NavigateFn = (page: Page, id?: number, options?: NavigateOptions) => void;

export function pathForPage(page: Page, id?: number, category?: string | null): string {
  switch (page) {
    case "home": return "/";
    case "about": return "/about";
    case "contact": return "/contact";
    case "journal": return "/journal";
    case "article": return "/journal/article";
    case "products": return category ? `/products?category=${encodeURIComponent(category)}` : "/products";
    case "product": return `/products/${productSlug(id ?? 0)}`;
    case "events": return "/events";
    case "event": return `/events/${id ?? 0}`;
  }
}

export type ParsedLocation = { page: Page; id: number; category: string | null };

export function parseLocation(pathname: string, search: string): ParsedLocation {
  const parts = pathname.split("/").filter(Boolean);
  const category = new URLSearchParams(search).get("category");

  if (parts[0] === "about") return { page: "about", id: 0, category: null };
  if (parts[0] === "contact") return { page: "contact", id: 0, category: null };
  if (parts[0] === "journal") {
    return parts[1] === "article"
      ? { page: "article", id: 0, category: null }
      : { page: "journal", id: 0, category: null };
  }
  if (parts[0] === "products") {
    if (!parts[1]) return { page: "products", id: 0, category };
    const slug = decodeURIComponent(parts[1]);
    // slug is the canonical form; a bare number keeps old /products/<id> links working
    const id = getProductBySlug(slug)?.id ?? (Number(slug) || 0);
    return { page: "product", id, category: null };
  }
  if (parts[0] === "events") {
    return parts[1]
      ? { page: "event", id: Number(parts[1]) || 0, category: null }
      : { page: "events", id: 0, category: null };
  }
  return { page: "home", id: 0, category: null };
}

export function ArrowLinkBtn({ children, onClick, light = false }: { children: ReactNode; onClick?: () => void; light?: boolean }) {
  const c = light ? "#fff" : "#1c1917";
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: c, background: "none", border: "none", cursor: "pointer", fontSize: 13, borderBottom: `1px solid ${light ? "rgba(255,255,255,0.6)" : "#1c1917"}`, paddingBottom: 2, fontFamily: "inherit" }}>
      {children}
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke={c} strokeWidth="1.3" style={{ transform: "scaleX(-1)" }}>
        <line x1="0" y1="5" x2="16" y2="5" /><polyline points="11,1 16,5 11,9" />
      </svg>
    </button>
  );
}
