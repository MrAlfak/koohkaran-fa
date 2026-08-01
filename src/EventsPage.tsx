import { img } from "./utils";
import { EVENTS } from "./events";
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

const TABS = [
  t("tabs.all"),
  t("events.categories.exhibitions"),
  t("events.categories.launches"),
  t("events.categories.workshops"),
  t("events.categories.fairs"),
  t("events.categories.announcements"),
] as const;

function EventCard({ event, onOpen }: { event: typeof EVENTS[number]; onOpen: () => void }) {
  return (
    <div style={{ cursor: "pointer" }} onClick={onOpen}>
      <div style={{ overflow: "hidden", marginBottom: 16 }}>
        <img src={img(event.image)} alt={event.title} style={{
          width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block",
          transition: "transform .7s ease",
        }}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")} />
      </div>
      <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a8a29e", margin: "0 0 8px" }}>{event.cat}</p>
      <h3 style={{ fontSize: 17, fontWeight: 400, lineHeight: 1.3, margin: "0 0 10px", color: "#1c1917" }}>{event.title}</h3>
      <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#78716c", margin: "0 0 8px" }}>{event.date}</p>
      <p style={{ fontSize: 13, color: "#78716c", lineHeight: 1.7, margin: 0 }}>{event.excerpt}</p>
    </div>
  );
}

export default function EventsPage({ onNavigate }: { onNavigate: NavigateFn }) {
  const [activeCat, setActiveCat] = useState<string>(t("tabs.all"));

  const allTab = t("tabs.all");
  const list = EVENTS.filter(e => activeCat === allTab || e.cat === activeCat);

  return (
    <div style={{ fontFamily: FONT_FAMILY, background: "#fff", color: "#1c1917", overflowX: "hidden" }}>
      <SiteHeader onNavigate={onNavigate} activeKey="events" />

      <section style={{ padding: "clamp(120px,14vw,180px) clamp(24px,5vw,64px) clamp(40px,5vw,64px)" }}>
        <div className="max-w-site journal-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }}>
          <Fade>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8a29e", margin: "0 0 20px" }}>{t("events.title")}</p>
            <h1 style={{ fontSize: "clamp(28px,3.4vw,52px)", fontWeight: 300, lineHeight: 1.2, margin: 0, color: "#1c1917" }}>
              {t("events.subtitle")}<br />{t("events.subtitle2")}
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
        <div className="max-w-site journal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(28px,3vw,48px)" }}>
          {list.map((event, i) => (
            <Fade key={event.id} d={(i % 3) * 0.08}>
              <EventCard event={event} onOpen={() => onNavigate("event", event.id)} />
            </Fade>
          ))}
        </div>
        {list.length === 0 && (
          <p style={{ color: "#a8a29e", fontSize: 14, margin: 0 }}>{t("events.empty")}</p>
        )}
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
