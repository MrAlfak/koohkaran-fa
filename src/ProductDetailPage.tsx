import { img } from "./utils";
import { PRODUCTS, getProduct } from "./products";
import { useState, useEffect, useRef } from "react";
import { t } from "./i18n";
import { FONT_FAMILY, ArrowLinkBtn, type NavigateFn } from "./shared/nav";
import { SiteFooter } from "./shared/SiteFooter";
import { SiteHeader } from "./shared/SiteHeader";
import ProductHeroReveal from "./components/ProductHeroReveal";
import Icon from "./components/StoneIcons";
import type { IconName } from "./components/StoneIcons";
import { applications, dataSheet, highlights, lead, reasons, slabSize, techSpecs, toFaDigits } from "./productSpecs";
import React from "react";

const INK = "#1c1917";
const MUTED = "#57534e";
const FAINT = "#a8a29e";
const HAIRLINE = "#eae8e4";
// شماره‌ای که «ثبت سفارش» با آن تماس می‌گیرد
const ORDER_TEL = "+989173090000";

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

/* یک سطر از جدول مشخصات، کنار عکس اسلب */
function SpecRow({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <div className="pd-spec">
      <span style={{ display: "inline-flex", alignItems: "center", gap: 12, color: MUTED, fontSize: 13.5 }}>
        <span style={{ color: FAINT }}><Icon name={icon} size={19} /></span>
        {label}
      </span>
      <span style={{ fontSize: 14, color: INK, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: `1px solid ${HAIRLINE}`,
  borderRadius: 10,
  padding: "clamp(24px,2.6vw,34px) clamp(22px,2.4vw,32px)",
};
const cardTitle: React.CSSProperties = {
  fontSize: "clamp(17px,1.5vw,21px)", fontWeight: 400, color: INK, margin: "0 0 clamp(20px,2vw,28px)",
};


/*
  تصویر جزئیات، با بقیه‌ی عکس‌های محصول به شکل بندانگشتی زیر آن.
  The detail shot, with the product’s other photographs under it as thumbnails.
  Clicking one moves it into the frame; the outgoing shot stays underneath until
  the new one has faded over it, so the swap never flashes the background.

  Several products point at files that are not in the build, so a photograph
  that fails to load takes itself out of the strip instead of showing a broken
  frame, and the strip disappears altogether when only one survives.
*/
function DetailGallery({ product }: { product: ReturnType<typeof getProduct> }) {
  // the detail shot leads: it is the one the measurements are drawn around
  const shots = [...new Set([product.detailImage, product.image, product.heroImage])];
  const [broken, setBroken] = useState<string[]>([]);
  const [active, setActive] = useState(shots[0]);
  const [prev, setPrev] = useState<string | null>(null);

  const usable = shots.filter(s => !broken.includes(s));
  const shown = usable.includes(active) ? active : usable[0] ?? shots[0];

  const swap = (s: string) => {
    if (s === shown) return;
    setPrev(shown);
    setActive(s);
  };

  return (
    <>
      <div className="pd-gallery" style={{ gridArea: "2 / 2" }}>
        {prev && <img className="pd-gallery__img" src={img(prev)} alt="" aria-hidden="true" />}
        {/* every candidate failed: leave the frame empty rather than show a broken image */}
        {usable.length > 0 && (
          <img
            key={shown}
            className="pd-gallery__img pd-gallery__img--in"
            src={img(shown)} alt={`${product.name} — ${t("products.surfaceAlt")}`} loading="lazy" decoding="async"
            onAnimationEnd={() => setPrev(null)}
            onError={() => setBroken(bs => bs.includes(shown) ? bs : [...bs, shown])}
          />
        )}
      </div>

      {usable.length > 1 && (
        <div className="pd-thumbs" style={{ gridArea: "3 / 2" }}>
          {usable.map((s, i) => (
            <button
              key={s} type="button"
              className={`pd-thumb${s === shown ? " is-active" : ""}`}
              aria-label={`${t("products.showPhoto")} ${toFaDigits(i + 1)}`}
              aria-pressed={s === shown}
              onClick={() => swap(s)}
            >
              <img src={img(s)} alt="" loading="lazy" decoding="async"
                onError={() => setBroken(bs => bs.includes(s) ? bs : [...bs, s])} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default function ProductDetailPage({ onNavigate, productId }: { onNavigate: NavigateFn; productId: number }) {
  const product = getProduct(productId);
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);
  const size = slabSize(product);
  const cm = t("products.centimeter");

  // برگه مشخصات از داده‌های خود سایت ساخته می‌شود، پس هر محصول یکی دارد
  const downloadSheet = () => {
    const url = URL.createObjectURL(new Blob([dataSheet(product)], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${product.code}-technical-data.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ fontFamily: FONT_FAMILY, background: "#fff", color: INK, overflowX: "hidden" }}>
      <SiteHeader onNavigate={onNavigate} activeKey="products" />

      {/* ══ مسیر راهنما ══ */}
      <section style={{ padding: "clamp(92px,10vw,124px) clamp(24px,5vw,64px) 0" }}>
        <nav aria-label="breadcrumb" style={{ maxWidth: 1240, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, fontSize: 12, color: FAINT }}>
          {([
            [t("nav.home"), () => onNavigate("home")],
            [t("nav.products"), () => onNavigate("products")],
            [product.cat, () => onNavigate("products", undefined, { category: product.cat })],
          ] as const).map(([label, go]) => (
            <React.Fragment key={label}>
              <button onClick={go} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 12, color: FAINT }}>{label}</button>
              <span style={{ color: "#d6d3d1" }}>/</span>
            </React.Fragment>
          ))}
          <span style={{ color: MUTED }}>{product.name}</span>
        </nav>
      </section>

      {/* ══ نمای کلی ══ */}
      <section style={{ padding: "clamp(22px,2.6vw,34px) clamp(24px,5vw,64px) clamp(44px,5.5vw,76px)" }}>
        <div className="pd-overview" style={{ maxWidth: "100%", margin: "0 auto" }}>
          <Fade>
            <figure className="pd-shot" style={{ margin: 0, position: "relative", borderRadius: 14, boxShadow: "0 5px 14px rgba(28,25,23,0.045)" }}>
              <ProductHeroReveal key={product.id} src={img(product.heroImage)} alt={product.name} title={product.name} />
              <figcaption style={{ position: "absolute", insetInlineStart: 14, bottom: 14, display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 11px", borderRadius: 14, background: "rgba(28,25,23,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "rgba(255,255,255,0.94)", fontSize: 11, letterSpacing: "0.04em" }}>
                <Icon name="texture" size={14} /> {t("products.interactiveTexture")}
              </figcaption>
            </figure>
          </Fade>

          <Fade d={0.08}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: FAINT, margin: "0 0 14px" }}>{product.cat}</p>
            <h1 style={{ fontSize: "clamp(30px,3.4vw,46px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em", margin: "0 0 18px", color: INK }}>{product.code}</h1>
            <p style={{ fontSize: 14.5, lineHeight: 1.75, color: MUTED, margin: "0 0 clamp(24px,2.6vw,34px)", maxWidth: 460 }}>{lead(product)}</p>

            <div style={{ borderTop: `1px solid ${HAIRLINE}`, marginBottom: "clamp(24px,2.6vw,34px)" }}>
              <SpecRow icon="stone" label={t("products.stoneType")} value={product.cat} />
              <SpecRow icon="size" label={t("products.size")} value={`${toFaDigits(product.size)} ${cm}`} />
              <SpecRow icon="finish" label={t("products.surfaceFinish")} value={product.finish} />
              <SpecRow icon="origin" label={t("products.origin")} value={product.origin} />
              <SpecRow icon="palette" label={t("products.colorSpectrum")} value={product.colors} />
            </div>

            <div className="pd-actions">
              {/* یک لینک واقعی است، نه دکمه، تا نگه‌داشتن/راست‌کلیک هم شماره را بدهد */}
              <a href={`tel:${ORDER_TEL}`} style={{
                fontSize: 13.5, letterSpacing: "0.02em", padding: "15px 20px", cursor: "pointer", borderRadius: 4,
                border: `1px solid ${INK}`, background: INK, color: "#fff", fontFamily: "inherit",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, textDecoration: "none",
              }}>
                <Icon name="phone" size={16} /> {t("products.orderNow")}
              </a>
              <button onClick={downloadSheet} style={{
                fontSize: 13.5, letterSpacing: "0.02em", padding: "15px 20px", cursor: "pointer", borderRadius: 4,
                border: "1px solid #d6d3d1", background: "#fff", color: INK, fontFamily: "inherit",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
              }}>
                <Icon name="download" size={16} /> {t("products.downloadDataSheet")}
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ══ جزئیات محصول ══ */}
      <section style={{ background: "#f7f6f4", padding: "clamp(48px,6vw,84px) clamp(24px,5vw,64px)" }}>
        <div className="pd-details" style={{ maxWidth: "100%", margin: "0 auto" }}>
          <Fade>
            <h2 style={{ fontSize: "clamp(21px,2.2vw,30px)", fontWeight: 400, color: INK, margin: "0 0 16px" }}>{t("products.productDetails")}</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.8, color: MUTED, margin: "0 0 clamp(28px,3vw,42px)", maxWidth: 420 }}>{product.description}</p>
            <ul className="pd-highlights">
              {highlights(product).map(h => (
                <li key={h.label} style={{ listStyle: "none" }} className="icon-listing-product">
                  <span style={{
                    width: 52, height: 52, borderRadius: "50%", background: "#efedea", color: MUTED,
                    display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 10,
                  }}><Icon name={h.icon} size={22} /></span>
                  <p style={{ fontSize: 11.5, lineHeight: 1.4, color: MUTED, margin: 0 }}>{h.label}</p>
                </li>
              ))}
            </ul>
          </Fade>

          <Fade d={0.08}>
            <div className="pd-measure">
              {size && (
                <div className="pd-measure__x" style={{ gridArea: "1 / 2" }}>
                  <span style={{ fontSize: 11, color: FAINT }}>{toFaDigits(size.w)} {cm}</span>
                  <i />
                </div>
              )}
              {size && (
                <div className="pd-measure__y" style={{ gridArea: "2 / 1" }}>
                  <span style={{ fontSize: 11, color: FAINT, writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{toFaDigits(size.h)} {cm}</span>
                  <i />
                </div>
              )}
              <DetailGallery key={product.id} product={product} />
            </div>
          </Fade>
        </div>
      </section>

      {/* ══ کاربردها + چرا این سنگ ══ */}
      <section style={{ padding: "clamp(44px,5.5vw,76px) clamp(24px,5vw,64px) 0" }}>
        <div className="pd-cards" style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Fade>
            <article style={cardStyle}>
              <h2 style={cardTitle}>{t("products.applications")}</h2>
              <ul className="pd-apps">
                {applications(product).map(a => (
                  <li key={a.label} style={{ listStyle: "none", textAlign: "center" }}>
                    <span style={{ display: "inline-flex", color: MUTED, marginBottom: 10 }}><Icon name={a.icon} size={23} /></span>
                    <p style={{ fontSize: 11.5, color: MUTED, margin: 0 }}>{a.label}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Fade>

          <Fade d={0.08}>
            <article style={cardStyle}>
              <h2 style={cardTitle}>{t("products.whyThisStone")}</h2>
              <ul style={{ margin: 0, padding: 0, display: "grid", gap: 15 }}>
                {reasons(product).map(r => (
                  <li key={r} style={{ listStyle: "none", display: "flex", alignItems: "center", gap: 12, fontSize: 13.5, color: MUTED }}>
                    <span style={{ color: INK }}><Icon name="check" size={17} /></span>
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          </Fade>
        </div>
      </section>

      {/* ══ مشخصات فنی ══ */}
      <section style={{ padding: "clamp(20px,2.4vw,32px) clamp(24px,5vw,64px) clamp(48px,6vw,84px)" }}>
        <Fade>
          {/* فاصله‌های ۱ پیکسلی روی زمینه مویی، همان خط‌های جداکننده‌اند، پس هرطور
              که سلول‌ها در صفحه باریک بشکنند سرجایشان می‌مانند */}
          <div className="pd-tech" style={{ maxWidth: 1240, margin: "0 auto", background: HAIRLINE, border: `1px solid ${HAIRLINE}`, borderRadius: 10, overflow: "hidden" }}>
            {techSpecs(product).map(s => (
              <div key={s.label} style={{ background: "#fff", padding: "clamp(20px,2.2vw,28px) 14px", textAlign: "center" }}>
                <p style={{ fontSize: 11, color: FAINT, margin: "0 0 8px" }}>{s.label}</p>
                <p style={{ fontSize: 14.5, color: INK, fontWeight: 500, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ══ محصولات مرتبط ══ */}
      <section style={{ padding: "0 clamp(24px,5vw,64px) clamp(60px,8vw,110px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: "clamp(22px,2.6vw,34px)" }}>
            <h2 style={{ fontSize: "clamp(21px,2.2vw,30px)", fontWeight: 400, margin: 0, color: INK }}>{t("products.relatedProducts")}</h2>
            <ArrowLinkBtn onClick={() => onNavigate("products")}>{t("products.viewAllProducts")}</ArrowLinkBtn>
          </div>
          <div className="pd-related">
            {related.map((p, i) => (
              <Fade key={p.id} d={i * 0.08}>
                <article onClick={() => onNavigate("product", p.id)} style={{ cursor: "pointer" }}>
                  <div style={{ overflow: "hidden", borderRadius: "8px 8px 0 0", aspectRatio: "4/3" }}>
                    <img src={img(p.image)} alt={p.name} loading="lazy" decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s ease" }}
                      onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                  <div style={{
                    border: `1px solid ${HAIRLINE}`, borderTop: "none", borderRadius: "0 0 8px 8px",
                    padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                  }}>
                    <div>
                      <h3 style={{ fontSize: 14.5, fontWeight: 400, margin: "0 0 4px", color: INK }}>{p.name}</h3>
                      <p style={{ fontSize: 11, letterSpacing: "0.06em", color: FAINT, margin: 0 }}>{p.code}</p>
                    </div>
                    {/* پیکان رو به جلو، که در راست‌چین یعنی رو به چپ */}
                    <span style={{ color: INK, transform: "scaleX(-1)" }}><Icon name="arrow" size={18} stroke={1.3} /></span>
                  </div>
                </article>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
