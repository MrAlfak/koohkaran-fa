import { img } from "./utils";
import { PRODUCTS, getProduct } from "./products";
import { useState, useEffect, useRef } from "react";
import { t } from "./i18n";
import { FONT_FAMILY, ArrowLinkBtn, type NavigateFn } from "./shared/nav";
import { SiteFooter } from "./shared/SiteFooter";
import { SiteHeader } from "./shared/SiteHeader";
import ProductHeroReveal from "./components/ProductHeroReveal";
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

const SPECS = (product: ReturnType<typeof getProduct>) => [
  { label: t("products.productCode"), val: product.code },
  { label: t("products.stoneType"), val: product.cat },
  { label: t("products.size"), val: product.size },
  { label: t("products.surfaceFinish"), val: product.finish },
  { label: t("products.origin"), val: product.origin },
  { label: t("products.colorSpectrum"), val: product.colors },
];

export default function ProductDetailPage({ onNavigate, productId }: { onNavigate: NavigateFn; productId: number }) {
  const product = getProduct(productId);
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ fontFamily: FONT_FAMILY, background: "#fff", color: "#1c1917", overflowX: "hidden" }}>
      <SiteHeader onNavigate={onNavigate} activeKey="products" />

      <section style={{ padding: "clamp(120px,14vw,180px) clamp(24px,5vw,64px) clamp(28px,3.5vw,44px)", textAlign: "center" }}>
        <Fade>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8a29e", margin: 0 }}>{product.code}&nbsp;&nbsp;·&nbsp;&nbsp;{product.cat}</p>
        </Fade>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,64px)" }}>
        <Fade>
          <ProductHeroReveal key={product.id} src={img(product.heroImage)} alt={product.name} title={product.name} />
        </Fade>
      </section>

      <section style={{ padding: "clamp(40px,5vw,72px) clamp(24px,5vw,64px)" }}>
        <div className="prod-spec-row" style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }}>
          <div className="prod-specs" style={{ display: "flex", flexWrap: "wrap", gap: "28px clamp(36px,5vw,72px)" }}>
            {SPECS(product).map(s => (
              <div key={s.label}>
                <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a8a29e", margin: "0 0 8px" }}>{s.label}</p>
                <p style={{ fontSize: 15, color: "#1c1917", margin: 0 }}>{s.val}</p>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate("contact")} style={{
            fontSize: 13, letterSpacing: "0.04em", padding: "13px 34px", cursor: "pointer",
            border: "1px solid #1c1917", color: "#1c1917", background: "transparent", fontFamily: "inherit", whiteSpace: "nowrap",
          }}>{t("products.orderNow")}</button>
        </div>
      </section>

      <section style={{ padding: "clamp(40px,5vw,72px) clamp(24px,5vw,64px) clamp(32px,4vw,56px)", textAlign: "center" }}>
        <Fade>
          <h2 style={{ fontSize: "clamp(24px,2.8vw,40px)", fontWeight: 300, margin: "0 0 14px", color: "#1c1917" }}>{t("products.productDetails")}</h2>
          {product.description && (
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#57534e", maxWidth: 720, margin: "0 auto" }}>{product.description}</p>
          )}
        </Fade>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,64px) clamp(60px,8vw,110px)" }}>
        <Fade>
          <div style={{ maxWidth: 1240, margin: "0 auto", overflow: "hidden" }}>
            <img src={img(product.detailImage)} alt={`${product.name} - جزئیات`} loading="lazy" decoding="async" style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block" }} />
          </div>
        </Fade>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,64px) clamp(60px,8vw,110px)" }}>
        <div className="max-w-site">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(28px,3.5vw,48px)" }}>
            <h2 style={{ fontSize: "clamp(22px,2.4vw,34px)", fontWeight: 300, margin: 0, color: "#1c1917" }}>{t("products.relatedProducts")}</h2>
            <ArrowLinkBtn onClick={() => onNavigate("products")}>{t("products.allProducts")}</ArrowLinkBtn>
          </div>
          <div className="prod-related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(20px,2.5vw,40px)" }}>
            {related.map((p, i) => (
              <Fade key={p.name} d={i * 0.08}>
                <div style={{ cursor: "pointer" }} onClick={() => onNavigate("product", p.id)}>
                  <div style={{ overflow: "hidden", marginBottom: 16, aspectRatio: "4/3" }}>
                    <img src={img(p.image)} alt={p.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s ease" }}
                      onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 400, margin: "0 0 5px", color: "#1c1917" }}>{p.name}</h3>
                  <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a8a29e", margin: 0 }}>{p.code}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
