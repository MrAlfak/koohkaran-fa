import { useEffect, useState } from "react";
import { img } from "../utils";
import { t } from "../i18n";
import NavHeaderActions from "../components/NavHeaderActions";
import { NAV_ITEMS, type NavKey, type NavigateFn } from "./nav";
import React from "react";

type HeaderTone = "hero" | "default" | "filled" | "soft";

export function SiteHeader({
  onNavigate,
  activeKey,
  tone = "default",
  heroScrolled,
}: {
  onNavigate: NavigateFn;
  activeKey?: NavKey | "contact";
  tone?: HeaderTone;
  heroScrolled?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHero = tone === "hero";
  const isSoft = tone === "soft";
  const headerScrolled = isHero ? (heroScrolled ?? scrolled) : scrolled;
  const navColor = isHero && !headerScrolled ? "#fff" : tone === "filled" ? "#57534e" : "#292524";
  const headerBg =
    tone === "filled" || headerScrolled || menuOpen
      ? "rgba(255,255,255,0.97)"
      : isHero
        ? "transparent"
        : isSoft
          ? "rgba(255,255,255,0.72)"
          : "rgba(255,255,255,0.97)";
  const headerShadow =
    headerScrolled || menuOpen || tone === "filled"
      ? "0 1px 0 rgba(0,0,0,0.06)"
      : isSoft
        ? "0 1px 0 rgba(0,0,0,0.03)"
        : "none";
  const headerBlur = headerScrolled || menuOpen || tone === "filled" || isSoft ? "blur(14px)" : isHero ? undefined : "blur(14px)";

  const go = (key: NavKey) => {
    setMenuOpen(false);
    if (key === "home") {
      onNavigate("home");
      return;
    }
    onNavigate(key);
  };

  return (
    <>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map(({ key, label }) => (
          <button key={key} className="mobile-menu-link" onClick={() => go(key)}>
            {label}
          </button>
        ))}
        <button
          className="mobile-menu-contact"
          onClick={() => {
            setMenuOpen(false);
            onNavigate("contact");
          }}
        >
          {t("nav.contact")}
        </button>
      </div>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(12px,2vw,20px) clamp(24px,5vw,64px)",
          background: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          boxShadow: headerShadow,
          transition: "background .4s, box-shadow .4s",
        }}
      >
        <button
          onClick={() => {
            setMenuOpen(false);
            onNavigate("home");
          }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, zIndex: 201 }}
        >
          <img src={img("images/logo.png")} alt={t("site.name")} style={{ width: 42, height: 42 }} />
        </button>

        <nav className="site-nav" style={{ gap: "clamp(20px,3vw,44px)" }}>
          {NAV_ITEMS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => go(key)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontSize: 14,
                color: navColor,
                textDecoration: activeKey === key ? "underline" : "none",
                textUnderlineOffset: 5,
                letterSpacing: "0.01em",
                fontFamily: "inherit",
                transition: "color .3s",
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <NavHeaderActions
          onContact={() => onNavigate("contact")}
          tone={tone}
          scrolled={headerScrolled || menuOpen}
        />

        <button
          className={`menu-btn${menuOpen ? " open" : ""}`}
          aria-label={t("nav.menu")}
          onClick={() => setMenuOpen((o) => !o)}
          style={{ color: isHero && !headerScrolled ? "#fff" : "#1c1917" }}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </>
  );
}
