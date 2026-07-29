import { img } from "../utils";
import { t } from "../i18n";
import { FOOTER_LINKS, ArrowLinkBtn, type NavigateFn } from "./nav";
import React from "react";

export function SiteFooter({ onNavigate }: { onNavigate: NavigateFn }) {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #f0ede8" }}>
      <div className="max-w-site footer-grid" style={{ padding: "clamp(48px,6vw,80px) clamp(24px,5vw,64px) clamp(24px,3vw,40px)" }}>
        <div>
          <p style={{ fontSize: 13, color: "#57534e", margin: "0 0 10px" }}>info@koohkaran.com</p>
          <p style={{ fontSize: 13, color: "#57534e", margin: "0 0 10px", direction: "ltr", textAlign: "right" }}>۰۹۱۷۳۰۹۰۰۰۰</p>
          <p style={{ fontSize: 13, color: "#57534e", margin: "0 0 32px", lineHeight: 1.6 }}>{t("home.addressLine1")}<br />{t("home.addressLine2")}</p>
          <ArrowLinkBtn onClick={() => onNavigate("contact")}>{t("home.contactUs")}</ArrowLinkBtn>
        </div>
        <div className="footer-logo-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <img src={img("images/logo.png")} alt={t("site.name")} style={{ width: 56, height: 56 }} />
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.14em", margin: "0 0 3px" }}>{t("site.brandLatin")}</p>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#a8a29e", margin: 0 }}>{t("site.slabMarket")}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
          {FOOTER_LINKS.map(([aKey, a, bKey, b], i) => (
            <React.Fragment key={i}>
              <button
                type="button"
                onClick={() => {
                  if (aKey === "home") onNavigate("home");
                  else if (aKey === "about") onNavigate("about");
                  else if (aKey === "contact") onNavigate("contact");
                  else if (aKey === "services") onNavigate("products");
                }}
                style={{ fontSize: 13, color: "#57534e", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "right", fontFamily: "inherit" }}
              >{a}</button>
              <button
                type="button"
                onClick={() => {
                  if (bKey === "products") onNavigate("products");
                  else if (bKey === "journal") onNavigate("journal");
                  else if (bKey === "events") onNavigate("events");
                  else if (bKey === "process") onNavigate("about");
                }}
                style={{ fontSize: 13, color: "#57534e", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "right", fontFamily: "inherit" }}
              >{b}</button>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="footer-bar" style={{ borderTop: "1px solid #f0ede8", padding: "clamp(14px,2vw,20px) clamp(24px,5vw,64px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 11, color: "#a8a29e", margin: 0 }}>{t("site.copyright")}</p>
        <div style={{ display: "flex", gap: 18 }}>
          {["●", "◆", "◻", "◯"].map((s, i) => <span key={i} style={{ fontSize: 10, color: "#d6d3d1", cursor: "pointer" }}>{s}</span>)}
        </div>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={t("site.backToTop")} style={{ background: "none", border: "1px solid #e7e5e4", padding: "7px 12px", cursor: "pointer", color: "#a8a29e", fontSize: 14 }}>↑</button>
      </div>
    </footer>
  );
}
