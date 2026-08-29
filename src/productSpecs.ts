import type { Product } from "./products";
import type { IconName } from "./components/StoneIcons";

/*
  آنچه صفحه محصول فراتر از خود رکورد محصول نشان می‌دهد: اعداد فنی، کاربردهای
  سنگ، و دلیل انتخاب آن.

  این مقادیر، مقادیر معمولِ هر خانواده سنگ است، نه اندازه‌گیری یک اسلب مشخص.
  اینجا نگهداری می‌شوند — یک جدول برای هر خانواده به‌جای یک فیلد روی هر ۵۷
  محصول — تا هر محصول همین امروز صفحه‌ای کامل داشته باشد و وقتی گزارش آزمون
  واقعی رسید، اصلاحش یک ویرایش در یک جا باشد.
*/

export type TechSpec = { label: string; value: string };

const L = {
  absorption: "جذب آب",
  density: "چگالی",
  compressive: "مقاومت فشاری",
  flexural: "مقاومت خمشی",
  abrasion: "مقاومت سایشی",
} as const;

const VERY_HIGH = "خیلی بالا";
const HIGH = "بالا";
const MEDIUM = "متوسط";
const LOW = "پایین";

const TECH: Record<string, TechSpec[]> = {
  "گرانیت": [
    { label: L.absorption, value: "۰٫۳۵٪" },
    { label: L.density, value: "۲٫۷ گرم بر سانتی‌متر مکعب" },
    { label: L.compressive, value: "۱۴۵ مگاپاسکال" },
    { label: L.flexural, value: "۱۸ مگاپاسکال" },
    { label: L.abrasion, value: HIGH },
  ],
  "ماربل": [
    { label: L.absorption, value: "۰٫۲۰٪" },
    { label: L.density, value: "۲٫۷ گرم بر سانتی‌متر مکعب" },
    { label: L.compressive, value: "۱۰۰ مگاپاسکال" },
    { label: L.flexural, value: "۱۲ مگاپاسکال" },
    { label: L.abrasion, value: MEDIUM },
  ],
  "کوارتزیت": [
    { label: L.absorption, value: "۰٫۳۰٪" },
    { label: L.density, value: "۲٫۶۵ گرم بر سانتی‌متر مکعب" },
    { label: L.compressive, value: "۱۹۰ مگاپاسکال" },
    { label: L.flexural, value: "۲۰ مگاپاسکال" },
    { label: L.abrasion, value: VERY_HIGH },
  ],
  "بازالت": [
    { label: L.absorption, value: "۰٫۵۰٪" },
    { label: L.density, value: "۲٫۹ گرم بر سانتی‌متر مکعب" },
    { label: L.compressive, value: "۲۰۰ مگاپاسکال" },
    { label: L.flexural, value: "۲۲ مگاپاسکال" },
    { label: L.abrasion, value: VERY_HIGH },
  ],
  "تراورتن": [
    { label: L.absorption, value: "۲٫۰٪" },
    { label: L.density, value: "۲٫۵ گرم بر سانتی‌متر مکعب" },
    { label: L.compressive, value: "۵۵ مگاپاسکال" },
    { label: L.flexural, value: "۹ مگاپاسکال" },
    { label: L.abrasion, value: MEDIUM },
  ],
  "اونیکس": [
    { label: L.absorption, value: "۰٫۴۰٪" },
    { label: L.density, value: "۲٫۷ گرم بر سانتی‌متر مکعب" },
    { label: L.compressive, value: "۸۰ مگاپاسکال" },
    { label: L.flexural, value: "۱۰ مگاپاسکال" },
    { label: L.abrasion, value: LOW },
  ],
  "لایم‌استون": [
    { label: L.absorption, value: "۲٫۰٪" },
    { label: L.density, value: "۲٫۴ گرم بر سانتی‌متر مکعب" },
    { label: L.compressive, value: "۶۰ مگاپاسکال" },
    { label: L.flexural, value: "۸ مگاپاسکال" },
    { label: L.abrasion, value: MEDIUM },
  ],
  "سنگ نیمه‌قیمتی": [
    { label: L.absorption, value: "۰٫۴۰٪" },
    { label: L.density, value: "۲٫۶۵ گرم بر سانتی‌متر مکعب" },
    { label: L.compressive, value: "۹۰ مگاپاسکال" },
    { label: L.flexural, value: "۱۱ مگاپاسکال" },
    { label: L.abrasion, value: MEDIUM },
  ],
};

export const techSpecs = (p: Product): TechSpec[] => TECH[p.cat] ?? TECH["گرانیت"];

export type Application = { icon: IconName; label: string };

const A: Record<string, Application> = {
  walls:    { icon: "wall",    label: "دیوار داخلی" },
  facades:  { icon: "facade",  label: "نمای بیرونی" },
  floors:   { icon: "floor",   label: "کف‌پوش" },
  stairs:   { icon: "stairs",  label: "پله" },
  kitchens: { icon: "kitchen", label: "آشپزخانه" },
  baths:    { icon: "bath",    label: "سرویس بهداشتی" },
  pools:    { icon: "pool",    label: "استخر" },
  tables:   { icon: "table",   label: "صفحه میز" },
};

const APPLICATIONS: Record<string, Application[]> = {
  "گرانیت":         [A.walls, A.facades, A.floors, A.stairs, A.kitchens, A.baths],
  "بازالت":         [A.walls, A.facades, A.floors, A.stairs, A.pools, A.baths],
  "کوارتزیت":       [A.walls, A.facades, A.floors, A.kitchens, A.baths, A.tables],
  "ماربل":          [A.walls, A.floors, A.stairs, A.kitchens, A.baths, A.tables],
  "تراورتن":        [A.walls, A.facades, A.floors, A.stairs, A.pools, A.baths],
  "لایم‌استون":      [A.walls, A.facades, A.floors, A.stairs, A.pools, A.baths],
  "اونیکس":         [A.walls, A.tables, A.baths, A.floors, A.kitchens, A.stairs],
  "سنگ نیمه‌قیمتی": [A.walls, A.tables, A.baths, A.floors, A.kitchens, A.stairs],
};

export const applications = (p: Product): Application[] => APPLICATIONS[p.cat] ?? APPLICATIONS["گرانیت"];

/*
  فرآوری سطح، خوانده‌شده از متن فارسی فیلد finish. یک اسلب ممکن است چند
  فرآوری در یک رشته داشته باشد ("هوند (مات) / لدرد (چرمی)")، پس ترتیب این
  بررسی‌ها ترتیب اولویت است: بافت‌دارترین حالت، نامی است که صفحه نشان می‌دهد.
*/
const TEXTURED = /بافت|صخره|متریکس|اسکرچ|پنجه|شیاردار|کاتن|پنبه|لینیال|خطی|Vein-Cut|خام/i;
const textured = (finish: string) => TEXTURED.test(finish);

const surfaceLabel = (finish: string) => {
  if (/سه‌بعدی|صخره|متریکس|بافت/.test(finish)) return "سطح بافت‌دار سه‌بعدی";
  if (/لدرد|چرمی/.test(finish)) return "سطح چرمی";
  if (/اسکرچ|پنجه|کاتن|پنبه/.test(finish)) return "سطح دست‌ساز";
  if (/سیلک|ساب سخت|صیقلی|ساب‌خورده/.test(finish)) return "سطح صیقلی";
  if (/هوند|مات/.test(finish)) return "سطح مات";
  return "پرداخت طبیعی";
};

export type Highlight = { icon: IconName; label: string };

const HARD_STONE = /گرانیت|بازالت|کوارتزیت/;

export const highlights = (p: Product): Highlight[] => [
  { icon: "natural", label: "ظاهر طبیعی" },
  { icon: "texture", label: surfaceLabel(p.finish) },
  { icon: "durability", label: HARD_STONE.test(p.cat) ? "دوام بالا" : "استحکام ماندگار" },
  { icon: "care", label: "نگهداری آسان" },
];

// چهار نقطه قوت، برگرفته از خانواده سنگ و از نحوه فرآوری اسلب
export function reasons(p: Product): string[] {
  const hardStone = HARD_STONE.test(p.cat);
  return [
    textured(p.finish) ? `${surfaceLabel(p.finish)} و منحصربه‌فرد` : `پرداخت ${p.finish} با بافتی یکدست`,
    hardStone ? "دوام و استحکام بالا" : "شخصیتی ظریف با عمق واقعی",
    hardStone ? "جذب آب پایین" : "تُن رنگ گرم و یکنواخت در سراسر اسلب",
    "ایده‌آل برای طراحی‌های معماری مدرن",
  ];
}

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** ارقام فارسی/عربی را به لاتین برمی‌گرداند تا بشود آن‌ها را عدد خواند. */
const toLatinDigits = (s: string) =>
  s.replace(/[۰-۹٠-٩]/g, (d) => {
    const i = FA_DIGITS.indexOf(d);
    return String(i >= 0 ? i : AR_DIGITS.indexOf(d));
  });

/** ارقام لاتین را برای نمایش، به فارسی برمی‌گرداند. */
export const toFaDigits = (s: string | number) =>
  String(s).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);

/**
 * ابعاد اسلب، برای نقشه اندازه‌گذاری‌شده. `size` به شکل «۲۰۹ × ۱۷۱» یا
 * «209 × 171» نوشته شده؛ هر دو شکل در فهرست محصولات هست.
 */
export function slabSize(p: Product): { w: number; h: number } | null {
  const m = toLatinDigits(p.size).match(/(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?)/i);
  return m ? { w: Number(m[1]), h: Number(m[2]) } : null;
}

/** متن آغازین: یکی دو جمله اول توضیحات. */
export function lead(p: Product): string {
  const d = p.description ?? "";
  const m = d.match(/^(?:[^.!?؟…]+[.!?؟…]+\s*){1,2}/);
  return (m ? m[0] : d).trim();
}

/** برگه مشخصات فنی به‌صورت متن ساده، ساخته‌شده از آنچه سایت واقعاً می‌داند. */
export function dataSheet(p: Product): string {
  const rows: [string, string][] = [
    ["کد محصول", p.code],
    ["نام", p.name],
    ["نوع سنگ", p.cat],
    ["ابعاد", `${p.size} سانتی‌متر`],
    ["پرداخت سطح", p.finish],
    ["مبدأ", p.origin],
    ["طیف رنگ", p.colors],
    ...techSpecs(p).map((t) => [t.label, t.value] as [string, string]),
  ];
  return [
    "کوه‌کاران — بازار اسلب",
    "برگه مشخصات فنی",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    p.description ?? "",
    "",
    "کاربردها: " + applications(p).map((a) => a.label).join("، "),
    "",
    "اعداد بالا مقادیر معمول این خانواده سنگ است و گزارش آزمون یک اسلب مشخص",
    "نیست. info@koohkaran.com",
    "",
  ].join("\n");
}
