import { img } from "./utils";
import { PRODUCTS, PRODUCT_CATEGORIES } from "./products";
import { useState, useEffect, useRef } from "react";
import { t } from "./i18n";
import { FONT_FAMILY, type NavigateFn } from "./shared/nav";
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

const TABS = [t("tabs.all"), ...PRODUCT_CATEGORIES] as const;
const PAGE_SIZE = 8;
const toFaDigits = (n: number) => n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export default function ProductsPage({
  onNavigate,
  initialCategory = null,
}: {
  onNavigate: NavigateFn;
  initialCategory?: string | null;
}) {
  const allTab = t("tabs.all");
  const [activeCat, setActiveCat] = useState<string>(initialCategory ?? allTab);
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCategory) setActiveCat(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setPage(1);
  }, [activeCat]);

  const list = PRODUCTS.filter((p) => activeCat === allTab || p.cat === activeCat);
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const pagedList = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (n: number) => {
    setPage(n);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: FONT_FAMILY, background: "#fff", color: "#1c1917", overflowX: "hidden" }}>
      <SiteHeader onNavigate={onNavigate} activeKey="products" />

      <section style={{ padding: "clamp(120px,14vw,180px) clamp(24px,5vw,64px) clamp(40px,5vw,64px)" }}>
        <div className="max-w-site journal-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 36 }}>
          <Fade>
            <h1 style={{ fontSize: "clamp(30px,3.6vw,54px)", fontWeight: 300, lineHeight: 1.1, margin: "0 0 24px", color: "#1c1917" }}>{t("products.title")}</h1>
            <p style={{ fontSize: "clamp(14px,1.05vw,15px)", fontWeight: 300, lineHeight: 1.8, color: "#57534e", maxWidth: 420, margin: 0 }}>
              {t("products.intro")}
            </p>
          </Fade>
          <Fade d={0.1}>
            <div className="journal-tabs" style={{ display: "flex", gap: "clamp(14px,1.4vw,24px)", flexWrap: "wrap" }}>
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveCat(tab)}
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: "2px 0", fontFamily: "inherit",
                    fontSize: 13, letterSpacing: "0.01em",
                    color: activeCat === tab ? (tab === allTab ? "#1c1917" : "#ca8a04") : "#78716c",
                    textDecoration: activeCat === tab ? "underline" : "none", textUnderlineOffset: 6,
                    textDecorationColor: activeCat === tab && tab !== allTab ? "#ca8a04" : "#1c1917",
                    transition: "color .2s",
                  }}>{tab}</button>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,64px) clamp(60px,8vw,110px)" }}>
        <div ref={gridRef} className="max-w-site products-page-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(20px,2.5vw,40px)" }}>
          {pagedList.map((p, i) => (
            <Fade key={p.name} d={(i % 4) * 0.07}>
              <div style={{ cursor: "pointer" }} onClick={() => onNavigate("product", p.id)}>
                <div style={{ overflow: "hidden", marginBottom: 16, aspectRatio: "4/3" }}>
                  <img src={img(p.image)} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s ease" }}
                    onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 400, margin: "0 0 5px", color: "#1c1917" }}>{p.name}</h3>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a8a29e", margin: 0 }}>{p.code}&nbsp;&nbsp;·&nbsp;&nbsp;{p.cat}&nbsp;&nbsp;·&nbsp;&nbsp;{p.size}</p>
              </div>
            </Fade>
          ))}
        </div>
        {list.length === 0 && <p style={{ maxWidth: 1400, margin: "0 auto", color: "#a8a29e", fontSize: 14 }}>{t("products.empty")}</p>}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(16px,2vw,32px)", marginTop: "clamp(40px,5vw,64px)" }}>
            <button onClick={() => page > 1 && goToPage(page - 1)} disabled={page === 1}
              style={{
                background: "none", border: "none", fontFamily: "inherit", fontSize: 13,
                cursor: page === 1 ? "default" : "pointer", color: page === 1 ? "#d6d3d1" : "#57534e",
                padding: 0,
              }}>{t("products.prevPage")}</button>
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => goToPage(n)}
                  style={{
                    width: 30, height: 30, border: "none", background: "none", cursor: "pointer",
                    fontSize: 13, fontFamily: "inherit",
                    color: page === n ? "#1c1917" : "#a8a29e",
                    textDecoration: page === n ? "underline" : "none", textUnderlineOffset: 6,
                  }}>{toFaDigits(n)}</button>
              ))}
            </div>
            <button onClick={() => page < totalPages && goToPage(page + 1)} disabled={page === totalPages}
              style={{
                background: "none", border: "none", fontFamily: "inherit", fontSize: 13,
                cursor: page === totalPages ? "default" : "pointer", color: page === totalPages ? "#d6d3d1" : "#57534e",
                padding: 0,
              }}>{t("products.nextPage")}</button>
          </div>
        )}
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
