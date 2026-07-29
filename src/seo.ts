import { t } from "./i18n";

export const SITE_NAME = t("site.name");
export const SITE_TAGLINE = t("site.tagline");
const DEFAULT_DESCRIPTION = t("seo.defaultDescription");
const DEFAULT_KEYWORDS = t("seo.keywords");

export type SeoPage =
  | "home"
  | "contact"
  | "about"
  | "journal"
  | "article"
  | "products"
  | "product"
  | "events"
  | "event";

const PAGE_SEO: Record<SeoPage, { title: string; description: string }> = {
  home: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    title: `درباره ما | ${SITE_NAME}`,
    description:
      "با کوه‌کاران آشنا شوید — تأمین و گزینش اسلب سنگ طبیعی ممتاز با مشاوره تخصصی برای معماران، طراحان و مشتریان خاص.",
  },
  products: {
    title: `محصولات و اسلب سنگ | ${SITE_NAME}`,
    description:
      "مجموعه گرانیت، مرمر، اونیکس، تراورتن، کوارتزیت و سنگ نیمه‌قیمتی را مرور کنید. بر اساس نوع سنگ فیلتر کنید و مشخصات را ببینید.",
  },
  product: {
    title: `جزئیات محصول | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
  },
  journal: {
    title: `مجله | ${SITE_NAME}`,
    description:
      "داستان‌های سنگ، بینش طراحی و به‌روزرسانی‌های صنعت از کوه‌کاران — الهام برای معماران و طراحان داخلی.",
  },
  article: {
    title: `مقاله | مجله ${SITE_NAME}`,
    description: "بینش طراحی و داستان‌های سنگ را از مجله کوه‌کاران بخوانید.",
  },
  events: {
    title: `رویدادها و نمایشگاه‌ها | ${SITE_NAME}`,
    description:
      "نمایشگاه‌های سنگ، رونمایی مجموعه‌ها، کارگاه‌ها و رویدادهای صنعتی کوه‌کاران.",
  },
  event: {
    title: `جزئیات رویداد | ${SITE_NAME}`,
    description: "جزئیات رویداد، تاریخ و اطلاعات ثبت‌نام از کوه‌کاران.",
  },
  contact: {
    title: `تماس با ما | ${SITE_NAME}`,
    description:
      "با کوه‌کاران برای مشاوره سنگ، انتخاب اسلب و استعلام پروژه تماس بگیرید. ۰۹۱۷۳۰۹۰۰۰۰ یا info@koohkaran.com",
  },
};

function siteOrigin(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${import.meta.env.BASE_URL}`.replace(/\/$/, "") + "/";
  }
  return "https://koohkaranstone.ir/";
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = url;
}

export function updatePageSeo(
  page: SeoPage,
  options?: { title?: string; description?: string },
) {
  const base = PAGE_SEO[page];
  const title = options?.title ?? base.title;
  const description = options?.description ?? base.description;
  const url = typeof window !== "undefined" ? window.location.href : siteOrigin();
  const image = `${siteOrigin()}images/logo.png`;

  document.title = title;

  setMeta("name", "description", description);
  setMeta("name", "keywords", DEFAULT_KEYWORDS);
  setMeta("name", "robots", "index, follow");
  setMeta("name", "author", SITE_NAME);

  setMeta("property", "og:type", "website");
  setMeta("property", "og:site_name", SITE_NAME);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", image);
  setMeta("property", "og:locale", "fa_IR");

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", image);

  setCanonical(url);
}
