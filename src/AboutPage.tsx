import { img } from "./utils";
import { useState, useEffect, useRef } from "react";
import { t } from "./i18n";
import { FONT_FAMILY, ArrowLinkBtn, type NavigateFn } from "./shared/nav";
import { SiteFooter } from "./shared/SiteFooter";
import { SiteHeader } from "./shared/SiteHeader";
import React from "react";

/* ─── fade-in on scroll ─── */
function useFade(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return { ref, v };
}
function Fade({ children, d = 0, style = {} }: { children: React.ReactNode; d?: number; style?: React.CSSProperties }) {
  const { ref, v } = useFade();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `opacity .8s ease ${d}s, transform .8s ease ${d}s`, ...style }}>
      {children}
    </div>
  );
}

const valueIcon = (paths: React.ReactNode) => (
  <svg width="34" height="20" viewBox="0 0 34 20" fill="none" stroke="#1c1917" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
);
/* ════════════════════════════════════ */
export default function AboutPage({ onNavigate }: { onNavigate: NavigateFn }) {
  const VALUES = [
    {
      icon: valueIcon(<><path d="M1 19h32" /><path d="M9 19a8 8 0 0 1 16 0" /></>),
      title: t("about.value1Title"),
      body: t("about.value1Body"),
    },
    {
      icon: valueIcon(<><path d="M1 19h32" /><path d="M17 4 6 19h22z" /><path d="M17 4v15" /></>),
      title: t("about.value2Title"),
      body: t("about.value2Body"),
    },
    {
      icon: valueIcon(<><path d="M1 19h32" /><path d="M7 19a10 10 0 0 1 20 0" /><circle cx="17" cy="9" r="1" /></>),
      title: t("about.value3Title"),
      body: t("about.value3Body"),
    },
    {
      icon: valueIcon(<><path d="M1 19h32" /><path d="M17 5 5 19h24z" /><path d="M12 19l5-14 5 14" /></>),
      title: t("about.value4Title"),
      body: t("about.value4Body"),
    },
  ];
  return (
    <div style={{ fontFamily: FONT_FAMILY, background: "#fff", color: "#1c1917", overflowX: "hidden" }}>
      <SiteHeader onNavigate={onNavigate} activeKey="about" tone="soft" />

      {/* ══ HERO ══ */}
      <section className="about-hero-grid" style={{ minHeight: "100svh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
        {/* Left text */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(100px,12vw,140px) clamp(32px,5vw,80px) clamp(60px,8vw,100px)" }}>
          <Fade>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 28 }}>{t("about.label")}</p>
            <h1 style={{ fontSize: "clamp(28px,3.2vw,48px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 28px", color: "#1c1917" }}>
              {t("about.title1")}<br />{t("about.title2")}<br />{t("about.title3")}
            </h1>
            <p style={{ fontSize: "clamp(14px,1.1vw,16px)", fontWeight: 300, lineHeight: 1.8, color: "#57534e", maxWidth: 480, margin: "0 0 40px" }}>
              {t("about.intro")}
            </p>
            <ArrowLinkBtn onClick={() => onNavigate("contact")}>{t("home.getInTouch")}</ArrowLinkBtn>
          </Fade>
        </div>

        {/* Right image — interior with stone wall */}
        <div className="about-hero-img" style={{ position: "relative", overflow: "hidden" }}>
          <img src={img("images/about_page_img_0.jpg")} alt={t("about.altInterior")} style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
            transition: "transform 8s ease",
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(255,255,255,0.04) 0%, transparent 30%)" }} />
        </div>
      </section>

      {/* ══ PHILOSOPHY ══ */}
      <section style={{ padding: "clamp(80px,10vw,130px) clamp(24px,5vw,64px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 32 }}>{t("about.philosophy")}</p>
            <p style={{ fontSize: "clamp(17px,1.8vw,26px)", fontWeight: 300, lineHeight: 1.75, color: "#2a2420", margin: 0 }}>
              {t("about.philosophyText")}
            </p>
          </Fade>
        </div>
      </section>

      {/* ══ OUR VALUES — grey bg ══ */}
      <section style={{ background: "#f7f7f7", padding: "clamp(60px,8vw,120px) clamp(24px,5vw,64px)" }}>
        <div className="about-values-grid" style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,100px)", alignItems: "center" }}>
          {/* Left image — stone texture */}
          <Fade d={0.1}>
            <div style={{ overflow: "hidden" }}>
              <img src={img("images/about_page_img_1.jpg")} alt={t("about.altStoneTexture")} style={{
                width: "100%", height: "clamp(400px,55vw,680px)", objectFit: "cover", display: "block",
                transition: "transform .7s ease",
              }}
                onMouseOver={e => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
            </div>
          </Fade>

          {/* Right text */}
          <Fade d={0.2}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 32 }}>{t("about.values")}</p>
            <h2 style={{ fontSize: "clamp(22px,2.4vw,34px)", fontWeight: 300, lineHeight: 1.35, color: "#1c1917", margin: "0 0 52px" }}>
              {t("about.valuesTitle1")}<br />{t("about.valuesTitle2")}<br />{t("about.valuesTitle3")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {VALUES.map((v, i) => (
                <div key={v.title} style={{ borderTop: "1px solid #e2e0de", padding: "26px 0", ...(i === VALUES.length - 1 ? { borderBottom: "1px solid #e2e0de" } : {}) }}>
                  <div style={{ marginBottom: 16 }}>{v.icon}</div>
                  <p style={{ fontSize: 15, fontWeight: 500, margin: "0 0 8px", letterSpacing: "0.01em" }}>{v.title}</p>
                  <p style={{ fontSize: 13, color: "#78716c", lineHeight: 1.75, margin: 0, maxWidth: 420 }}>{v.body}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ══ GALLERY — two images ══ */}
      <section style={{ padding: "clamp(60px,8vw,110px) clamp(24px,5vw,64px) clamp(40px,5vw,70px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="about-gallery-grid" style={{ display: "grid", gridTemplateColumns: "5fr 12fr", gap: "clamp(16px,2.5vw,40px)", alignItems: "end" }}>
            {/* Tall vertical image */}
            <Fade d={0.1}>
              <div style={{ overflow: "hidden" }}>
                <img src={img("images/about_page_img_2.jpg")} alt={t("about.altStoneBuilding")} style={{
                  width: "100%", aspectRatio: "2/3", objectFit: "cover", display: "block",
                  transition: "transform .7s ease",
                }}
                  onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
                <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a8a29e", margin: "14px 0 0", lineHeight: 1.6 }}>{t("about.galleryCaption")}</p>
              </div>
            </Fade>
            {/* Wide landscape image */}
            <Fade d={0.2}>
              <div style={{ overflow: "hidden" }}>
                <img src={img("images/about_page_img_3.jpg")} alt={t("about.altStoneFacade")} style={{
                  width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block",
                  transition: "transform .7s ease",
                }}
                  onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
                <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a8a29e", margin: "14px 0 0", textAlign: "center" }}>{t("about.galleryCaption")}</p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ══ OUR APPROACH — two-col text ══ */}
      <section style={{ padding: "clamp(40px,6vw,80px) clamp(24px,5vw,64px) clamp(60px,8vw,110px)" }}>
        <div className="about-approach-grid" style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "start" }}>
          <Fade>
            <h2 style={{ fontSize: "clamp(24px,2.6vw,38px)", fontWeight: 300, lineHeight: 1.25, color: "#1c1917", margin: "0 0 28px" }}>
              {t("about.approachTitle")}
            </h2>
            <ArrowLinkBtn onClick={() => onNavigate("contact")}>{t("home.contactUs")}</ArrowLinkBtn>
          </Fade>
          <Fade d={0.15}>
            <p style={{ fontSize: "clamp(14px,1.05vw,15px)", fontWeight: 300, lineHeight: 1.85, color: "#57534e", margin: 0 }}>
              {t("about.approachText")}
            </p>
          </Fade>
        </div>
      </section>

      {/* ══ FULL-WIDTH IMAGE ══ */}
      <section style={{ height: "clamp(360px,48vw,620px)", overflow: "hidden" }}>
        <img src={img("images/about_page_img_4.jpg")} alt={t("about.altLuxuryStone")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }} />
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
