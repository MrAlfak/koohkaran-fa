import { img } from "./utils";
import { useState, useEffect, useRef } from "react";
import { t } from "./i18n";
import { FONT_FAMILY, ArrowLinkBtn, type NavigateFn } from "./shared/nav";
import { SiteFooter } from "./shared/SiteFooter";
import { SiteHeader } from "./shared/SiteHeader";
import React from "react";

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
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${d}s, transform .8s cubic-bezier(.2,.7,.2,1) ${d}s`, ...style }}>
      {children}
    </div>
  );
}

const aimg = (n: number) => img(`images/injournal_img_${n}.jpg`);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: "clamp(15px,1.15vw,17px)", fontWeight: 300, lineHeight: 1.85, color: "#3a3530", margin: "0 0 22px" }}>{children}</p>
);
const H = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: "clamp(20px,1.9vw,26px)", fontWeight: 400, lineHeight: 1.3, color: "#1c1917", margin: "44px 0 20px" }}>{children}</h2>
);

export default function ArticlePage({ onNavigate }: { onNavigate: NavigateFn }) {
  const imageAlt = t("journal.article.imageAlt");

  return (
    <div style={{ fontFamily: FONT_FAMILY, background: "#fff", color: "#1c1917", overflowX: "hidden" }}>
      <SiteHeader onNavigate={onNavigate} activeKey="journal" />

      <section style={{ padding: "clamp(120px,14vw,180px) clamp(24px,5vw,64px) clamp(32px,4vw,52px)", textAlign: "center" }}>
        <Fade>
          <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#a8a29e", margin: "0 0 22px" }}>{t("journal.article.category")}</p>
          <h1 style={{ fontSize: "clamp(32px,4.4vw,64px)", fontWeight: 300, lineHeight: 1.12, margin: "0 0 22px", color: "#1c1917" }}>{t("journal.article.title")}</h1>
          <p style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a8a29e", margin: 0 }}>{t("journal.article.date")}</p>
        </Fade>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,64px) clamp(48px,6vw,80px)" }}>
        <Fade>
          <div style={{ maxWidth: 1240, margin: "0 auto", overflow: "hidden" }}>
            <img src={aimg(3)} alt={t("journal.article.title")} style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
          </div>
        </Fade>
      </section>

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(24px,5vw,40px)" }}>
        <Fade>
          <p style={{ fontSize: "clamp(15px,1.15vw,17px)", fontWeight: 300, lineHeight: 1.85, color: "#3a3530", margin: "0 0 22px" }}>
            <span style={{ float: "right", fontSize: "clamp(52px,5vw,74px)", lineHeight: 0.82, fontWeight: 300, margin: "6px 0 0 14px", color: "#1c1917" }}>{t("journal.article.dropCap")}</span>
            {t("journal.article.intro")}
          </p>
          <P>{t("journal.article.p1")}</P>
        </Fade>

        <Fade><H>{t("journal.article.h1")}</H></Fade>
        <Fade>
          <P>{t("journal.article.p2")}</P>
          <P>{t("journal.article.p3")}</P>
        </Fade>
      </article>

      <section style={{ padding: "clamp(48px,6vw,80px) clamp(24px,5vw,64px)" }}>
        <div className="article-pair" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px,2vw,28px)" }}>
          <Fade><div style={{ overflow: "hidden" }}><img src={aimg(0)} alt={imageAlt} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} /></div></Fade>
          <Fade d={0.1}><div style={{ overflow: "hidden" }}><img src={aimg(1)} alt={imageAlt} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} /></div></Fade>
        </div>
      </section>

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(24px,5vw,40px)" }}>
        <Fade><H>{t("journal.article.h2")}</H></Fade>
        <Fade>
          <P>{t("journal.article.p4")}</P>
          <P>{t("journal.article.p5")}</P>
        </Fade>
      </article>

      <section style={{ height: "clamp(360px,46vw,600px)", overflow: "hidden", margin: "clamp(40px,5vw,72px) 0" }}>
        <Fade style={{ height: "100%" }}>
          <img src={aimg(4)} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </Fade>
      </section>

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(24px,5vw,40px)" }}>
        <Fade><H>{t("journal.article.h3")}</H></Fade>
        <Fade>
          <P>{t("journal.article.p6")}</P>
          <P>{t("journal.article.p7")}</P>
        </Fade>
      </article>

      <section style={{ padding: "clamp(48px,6vw,80px) clamp(24px,5vw,64px)" }}>
        <div className="article-pair" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px,2vw,28px)" }}>
          <Fade><div style={{ overflow: "hidden" }}><img src={aimg(5)} alt={imageAlt} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} /></div></Fade>
          <Fade d={0.1}><div style={{ overflow: "hidden" }}><img src={aimg(6)} alt={imageAlt} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} /></div></Fade>
        </div>
      </section>

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(24px,5vw,40px) clamp(60px,8vw,110px)", textAlign: "center" }}>
        <Fade>
          <P>{t("journal.article.closing")}</P>
          <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
            <ArrowLinkBtn onClick={() => onNavigate("journal")}>{t("journal.backToJournal")}</ArrowLinkBtn>
          </div>
        </Fade>
      </article>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
