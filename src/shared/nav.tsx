import type { ReactNode } from "react";
import { t } from "../i18n";

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

export const FONT_FAMILY = "'Vazirmatn', 'Helvetica Neue', Arial, sans-serif";

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
