import { img } from "./utils";
import { EVENTS, getEvent } from "./events";
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
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `opacity .8s ease ${d}s, transform .8s ease ${d}s`, ...style }}>
      {children}
    </div>
  );
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: "clamp(15px,1.15vw,17px)", fontWeight: 300, lineHeight: 1.85, color: "#3a3530", margin: "0 0 22px" }}>{children}</p>
);

export default function EventDetailPage({ onNavigate, eventId }: { onNavigate: NavigateFn; eventId: number }) {
  const event = getEvent(eventId);
  const related = EVENTS.filter(e => e.id !== event.id).slice(0, 3);

  return (
    <div style={{ fontFamily: FONT_FAMILY, background: "#fff", color: "#1c1917", overflowX: "hidden" }}>
      <SiteHeader onNavigate={onNavigate} activeKey="events" />

      <section style={{ padding: "clamp(120px,14vw,180px) clamp(24px,5vw,64px) clamp(32px,4vw,52px)", textAlign: "center" }}>
        <Fade>
          <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#a8a29e", margin: "0 0 22px" }}>{event.cat}</p>
          <h1 style={{ fontSize: "clamp(32px,4.4vw,64px)", fontWeight: 300, lineHeight: 1.12, margin: "0 0 22px", color: "#1c1917", maxWidth: 900, marginInline: "auto" }}>{event.title}</h1>
          <p style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a8a29e", margin: "0 0 8px" }}>{event.date}</p>
          <p style={{ fontSize: 13, color: "#78716c", margin: 0 }}>{event.location}</p>
        </Fade>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,64px) clamp(48px,6vw,80px)" }}>
        <Fade>
          <div style={{ maxWidth: 1240, margin: "0 auto", overflow: "hidden" }}>
            <img src={img(event.heroImage)} alt={event.title} style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
          </div>
        </Fade>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,64px) clamp(60px,8vw,100px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontSize: "clamp(17px,1.4vw,20px)", fontWeight: 300, lineHeight: 1.75, color: "#1c1917", margin: "0 0 32px" }}>{event.excerpt}</p>
            {event.body.map((paragraph, i) => (
              <P key={i}>{paragraph}</P>
            ))}
            <button onClick={() => onNavigate("contact")} style={{
              marginTop: 16, fontSize: 13, letterSpacing: "0.06em", padding: "14px 36px", cursor: "pointer",
              border: "1px solid #1c1917", color: "#fff", background: "#1c1917", fontFamily: "inherit",
            }}>{t("events.register")}</button>
          </Fade>
        </div>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,64px) clamp(60px,8vw,110px)" }}>
        <div className="max-w-site">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(28px,3.5vw,48px)" }}>
            <h2 style={{ fontSize: "clamp(22px,2.4vw,34px)", fontWeight: 300, margin: 0, color: "#1c1917" }}>{t("events.moreEvents")}</h2>
            <ArrowLinkBtn onClick={() => onNavigate("events")}>{t("events.allEvents")}</ArrowLinkBtn>
          </div>
          <div className="journal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(20px,2.5vw,40px)" }}>
            {related.map((e, i) => (
              <Fade key={e.id} d={i * 0.08}>
                <div style={{ cursor: "pointer" }} onClick={() => onNavigate("event", e.id)}>
                  <div style={{ overflow: "hidden", marginBottom: 16, aspectRatio: "4/3" }}>
                    <img src={img(e.image)} alt={e.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s ease" }}
                      onMouseOver={el => (el.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={el => (el.currentTarget.style.transform = "scale(1)")} />
                  </div>
                  <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a8a29e", margin: "0 0 8px" }}>{e.cat}</p>
                  <h3 style={{ fontSize: 16, fontWeight: 400, margin: "0 0 6px", color: "#1c1917" }}>{e.title}</h3>
                  <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#78716c", margin: 0 }}>{e.date}</p>
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
