import { img } from "./utils";
import { useState } from "react";
import { t } from "./i18n";
import { FONT_FAMILY, type NavigateFn } from "./shared/nav";
import { SiteFooter } from "./shared/SiteFooter";
import { SiteHeader } from "./shared/SiteHeader";
import React from "react";

interface Props {
  onNavigate: NavigateFn;
}

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 8 }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          height: 52,
          padding: "0 16px",
          border: `1px solid ${error ? "#b91c1c" : "#d6d3d1"}`,
          background: "#fff",
          fontSize: 14,
          color: "#1c1917",
          outline: "none",
          fontFamily: "inherit",
          boxSizing: "border-box",
          transition: "border-color .2s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = error ? "#b91c1c" : "#1c1917")}
        onBlur={(e) => (e.currentTarget.style.borderColor = error ? "#b91c1c" : "#d6d3d1")}
      />
      {error && <p style={{ fontSize: 12, color: "#b91c1c", margin: "6px 0 0" }}>{error}</p>}
    </div>
  );
}

export default function ContactPage({ onNavigate }: Props) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", company: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = t("contact.requiredField");
    if (!form.email.trim()) next.email = t("contact.requiredField");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t("contact.invalidEmail");
    if (!form.message.trim()) next.message = t("contact.requiredField");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  const setField = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  return (
    <div style={{ fontFamily: FONT_FAMILY, background: "#fff", color: "#1c1917", minHeight: "100vh" }}>
      <SiteHeader onNavigate={onNavigate} activeKey="contact" tone="filled" />

      <div className="contact-split" style={{ paddingTop: 80, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
        <div style={{ padding: "clamp(60px,8vw,100px) clamp(32px,5vw,80px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 20 }}>{t("contact.label")}</p>
          <h1 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, margin: "0 0 12px", lineHeight: 1.2 }}>{t("contact.title")}</h1>
          <p style={{ fontSize: 14, color: "#78716c", lineHeight: 1.7, marginBottom: 48, maxWidth: 440 }}>
            {t("contact.intro")}
          </p>

          {sent ? (
            <div style={{ padding: "32px", background: "#f7f7f7", textAlign: "center" }}>
              <p style={{ fontSize: 16, fontWeight: 400, margin: "0 0 8px" }}>{t("contact.thankYou")}</p>
              <p style={{ fontSize: 13, color: "#78716c", margin: 0 }}>{t("contact.thankYouSub")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                <Input label={t("contact.fullName")} name="name" value={form.name} onChange={setField("name")} error={errors.name} />
                <Input label={t("contact.email")} type="email" name="email" value={form.email} onChange={setField("email")} error={errors.email} />
                <Input label={t("contact.phone")} type="tel" name="phone" value={form.phone} onChange={setField("phone")} />
                <Input label={t("contact.city")} name="city" value={form.city} onChange={setField("city")} />
                <div style={{ gridColumn: "1 / -1" }}>
                  <Input label={t("contact.company")} name="company" value={form.company} onChange={setField("company")} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a8a29e", marginBottom: 8 }}>{t("contact.message")}</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setField("message")(e.target.value)}
                  placeholder={t("contact.messagePlaceholder")}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: `1px solid ${errors.message ? "#b91c1c" : "#d6d3d1"}`,
                    background: "#fff",
                    fontSize: 14,
                    color: "#1c1917",
                    outline: "none",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box",
                    transition: "border-color .2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = errors.message ? "#b91c1c" : "#1c1917")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = errors.message ? "#b91c1c" : "#d6d3d1")}
                />
                {errors.message && <p style={{ fontSize: 12, color: "#b91c1c", margin: "6px 0 0" }}>{errors.message}</p>}
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  height: 52,
                  background: "#1c1917",
                  color: "#fff",
                  border: "none",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background .2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#292524")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#1c1917")}
              >
                {t("contact.send")}
              </button>
            </form>
          )}

          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 40px" }}>
            {[
              { label: t("contact.emailLabel"), val: "info@koohkaran.com" },
              { label: t("contact.phoneLabel"), val: "۰۹۱۷۳۰۹۰۰۰۰" },
              { label: t("contact.addressLabel"), val: `${t("home.addressLine1")}\n${t("home.addressLine2")}` },
              { label: t("contact.hoursLabel"), val: `${t("contact.hoursValue")}\n${t("contact.hoursTime")}` },
            ].map(({ label, val }) => (
              <div key={label}>
                <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a8a29e", margin: "0 0 6px" }}>{label}</p>
                <p style={{ fontSize: 13, color: "#1c1917", margin: 0, lineHeight: 1.6, whiteSpace: "pre-line" }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={img("images/contact_img_1.jpg")} alt={t("contact.title")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(255,255,255,0.06) 0%, transparent 40%)" }} />
        </div>
      </div>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
