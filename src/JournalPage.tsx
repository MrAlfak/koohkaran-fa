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

const TABS = [
  t("journal.tabs.all"),
  t("journal.tabs.interior"),
  t("journal.tabs.exteriors"),
  t("journal.tabs.tips"),
  t("journal.tabs.media"),
  t("journal.tabs.announcements"),
] as const;

type Post = { cat: string; title: string; excerpt?: string; src: string };

const ji = (n: number) => img(`images/journal_img_${n}.jpg`);

const FEATURED: Post[] = [
  { cat: t("journal.tabs.exteriors"), title: t("journal.posts.beautyOfRestraint.title"), excerpt: t("journal.posts.beautyOfRestraint.excerpt"), src: ji(0) },
  { cat: t("journal.tabs.interior"), title: t("journal.posts.designingForRealLife.title"), excerpt: t("journal.posts.designingForRealLife.excerpt"), src: ji(1) },
];

const GRID1: Post[] = [
  { cat: t("journal.tabs.interior"), title: t("journal.posts.fromMoodToMatter.title"), excerpt: t("journal.posts.fromMoodToMatter.excerpt"), src: ji(2) },
  { cat: t("journal.tabs.tips"), title: t("journal.posts.bedroomEssentials.title"), excerpt: t("journal.posts.bedroomEssentials.excerpt"), src: ji(3) },
  { cat: t("journal.tabs.interior"), title: t("journal.posts.maximisingLight.title"), excerpt: t("journal.posts.maximisingLight.excerpt"), src: ji(4) },
];

const GRID2: Post[] = [
  { cat: t("journal.tabs.tips"), title: t("journal.posts.modernCabin.title"), excerpt: t("journal.posts.modernCabin.excerpt"), src: ji(5) },
  { cat: t("journal.tabs.interior"), title: t("journal.posts.patternsTextures.title"), excerpt: t("journal.posts.patternsTextures.excerpt"), src: ji(6) },
  { cat: t("journal.tabs.tips"), title: t("journal.posts.gardenDesign.title"), excerpt: t("journal.posts.gardenDesign.excerpt"), src: ji(7) },
];

const FEATURED2: Post[] = [
  { cat: t("journal.tabs.interior"), title: t("journal.posts.modernHouse.title"), excerpt: t("journal.posts.modernHouse.excerpt"), src: ji(8) },
  { cat: t("journal.tabs.tips"), title: t("journal.posts.cleanEnergy.title"), excerpt: t("journal.posts.cleanEnergy.excerpt"), src: ji(9) },
];

const GRID3: Post[] = [
  { cat: t("journal.tabs.media"), title: t("journal.posts.sustainableLuxury.title"), excerpt: t("journal.posts.sustainableLuxury.excerpt"), src: ji(10) },
  { cat: t("journal.tabs.announcements"), title: t("journal.posts.designAwards.title"), excerpt: t("journal.posts.designAwards.excerpt"), src: ji(11) },
  { cat: t("journal.tabs.media"), title: t("journal.posts.industrialLuxury.title"), excerpt: t("journal.posts.industrialLuxury.excerpt"), src: ji(12) },
];

function Card({ post, featured = false, onOpen }: { post: Post; featured?: boolean; onOpen?: () => void }) {
  return (
    <div style={{ cursor: "pointer" }} onClick={onOpen}>
      <div style={{ overflow: "hidden", marginBottom: featured ? 20 : 16 }}>
        <img src={post.src} alt={post.title} style={{
          width: "100%", aspectRatio: featured ? "3/2" : "1/1", objectFit: "cover", display: "block",
          transition: "transform .7s ease",
        }}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
      </div>
      <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a8a29e", margin: "0 0 8px" }}>{post.cat}</p>
      <h3 style={{ fontSize: featured ? "clamp(18px,1.6vw,22px)" : 17, fontWeight: 400, lineHeight: 1.3, margin: post.excerpt ? "0 0 10px" : 0, color: "#1c1917" }}>{post.title}</h3>
      {post.excerpt && <p style={{ fontSize: 13, color: "#78716c", lineHeight: 1.7, margin: 0 }}>{post.excerpt}</p>}
    </div>
  );
}

export default function JournalPage({ onNavigate }: { onNavigate: NavigateFn }) {
  const [activeCat, setActiveCat] = useState<string>(t("journal.tabs.all"));

  const allTab = t("journal.tabs.all");
  const show = (p: Post) => activeCat === allTab || p.cat === activeCat;
  const f = (arr: Post[]) => arr.filter(show);
  const visibleCount =
    f(FEATURED).length +
    f(GRID1).length +
    f(GRID2).length +
    f(FEATURED2).length +
    f(GRID3).length;

  return (
    <div style={{ fontFamily: FONT_FAMILY, background: "#fff", color: "#1c1917", overflowX: "hidden" }}>
      <SiteHeader onNavigate={onNavigate} activeKey="journal" />

      <section style={{ padding: "clamp(120px,14vw,180px) clamp(24px,5vw,64px) clamp(40px,5vw,64px)" }}>
        <div className="max-w-site journal-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }}>
          <Fade>
            <h1 style={{ fontSize: "clamp(28px,3.4vw,52px)", fontWeight: 300, lineHeight: 1.2, margin: 0, color: "#1c1917" }}>
              {t("journal.title")}<br />{t("journal.title2")}
            </h1>
          </Fade>
          <Fade d={0.1}>
            <div className="journal-tabs" style={{ display: "flex", gap: "clamp(16px,1.6vw,28px)", flexWrap: "wrap" }}>
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveCat(tab)}
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: "2px 0", fontFamily: "inherit",
                    fontSize: 13, letterSpacing: "0.01em",
                    color: activeCat === tab ? "#1c1917" : "#78716c",
                    textDecoration: activeCat === tab ? "underline" : "none", textUnderlineOffset: 6,
                    transition: "color .2s",
                  }}>{tab}</button>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,64px) clamp(60px,8vw,110px)" }}>
        <div className="max-w-site" style={{ display: "flex", flexDirection: "column", gap: "clamp(48px,6vw,90px)" }}>

          {f(FEATURED).length > 0 && (
            <div className="journal-feat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,48px)" }}>
              {f(FEATURED).map((p, i) => <Fade key={p.title} d={i * 0.1}><Card post={p} featured onOpen={() => onNavigate("article")} /></Fade>)}
            </div>
          )}

          {f(GRID1).length > 0 && (
            <div className="journal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(24px,3vw,48px)" }}>
              {f(GRID1).map((p, i) => <Fade key={p.title} d={i * 0.08}><Card post={p} onOpen={() => onNavigate("article")} /></Fade>)}
            </div>
          )}

          {f(GRID2).length > 0 && (
            <div className="journal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(24px,3vw,48px)" }}>
              {f(GRID2).map((p, i) => <Fade key={p.title} d={i * 0.08}><Card post={p} onOpen={() => onNavigate("article")} /></Fade>)}
            </div>
          )}

          {f(FEATURED2).length > 0 && (
            <div className="journal-feat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,48px)" }}>
              {f(FEATURED2).map((p, i) => <Fade key={p.title} d={i * 0.1}><Card post={p} featured onOpen={() => onNavigate("article")} /></Fade>)}
            </div>
          )}

          {f(GRID3).length > 0 && (
            <div className="journal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(24px,3vw,48px)" }}>
              {f(GRID3).map((p, i) => <Fade key={p.title} d={i * 0.08}><Card post={p} onOpen={() => onNavigate("article")} /></Fade>)}
            </div>
          )}

          {visibleCount === 0 && (
            <p style={{ textAlign: "center", color: "#a8a29e", fontSize: 14, margin: 0 }}>{t("journal.emptyFilter")}</p>
          )}

        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
