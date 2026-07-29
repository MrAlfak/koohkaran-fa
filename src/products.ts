export const PRODUCT_CATEGORIES = [
  "گرانیت",
  "مرمر",
  "اونیکس",
  "تراورتن",
  "کوارتزیت",
  "نیمه‌قیمتی",
  "سنگ آهک",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type Product = {
  id: number;
  code: string;
  name: string;
  cat: string;
  size: string;
  image: string;
  heroImage: string;
  detailImage: string;
  finish: string;
  origin: string;
  colors: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 0,
    code: "KK-M-101",
    name: "جلبک سخت",
    cat: "مرمر",
    size: "۳۲۲ × ۱۸۰",
    image: "images/prod_img_0.jpg",
    heroImage: "images/inprod_img_0.jpg",
    detailImage: "images/inprod_img_1.jpg",
    finish: "صیقلی",
    origin: "ایرانی",
    colors: "سبز، سفید",
  },
  {
    id: 1,
    code: "KK-M-102",
    name: "جلبک پنبه‌ای",
    cat: "مرمر",
    size: "۳۲۰ × ۱۷۵",
    image: "images/prod_img_1.jpg",
    heroImage: "images/inprod_img_1.jpg",
    detailImage: "images/inprod_img_2.jpg",
    finish: "مات",
    origin: "ایرانی",
    colors: "کرم، سبز",
  },
  {
    id: 2,
    code: "KK-M-103",
    name: "مرمر کرم راک",
    cat: "تراورتن",
    size: "۲۲۵ × ۱۹۰",
    image: "images/prod_img_2.jpg",
    heroImage: "images/inprod_img_2.jpg",
    detailImage: "images/inprod_img_3.jpg",
    finish: "صیقلی",
    origin: "ایرانی",
    colors: "کرم، بژ",
  },
  {
    id: 3,
    code: "KK-G-201",
    name: "کریستال الماس ابریشمی",
    cat: "گرانیت",
    size: "۲۷۰ × ۱۷۵",
    image: "images/prod_img_3.jpg",
    heroImage: "images/inprod_img_3.jpg",
    detailImage: "images/inprod_img_4.jpg",
    finish: "ابریشمی",
    origin: "ایرانی",
    colors: "خاکستری، سفید",
  },
  {
    id: 4,
    code: "KK-M-104",
    name: "کریستال دژاوو",
    cat: "مرمر",
    size: "۲۸۰ × ۱۷۵",
    image: "images/prod_img_4.jpg",
    heroImage: "images/inprod_img_4.jpg",
    detailImage: "images/inprod_img_5.jpg",
    finish: "صیقلی",
    origin: "ایرانی",
    colors: "خاکستری، مشکی",
  },
  {
    id: 5,
    code: "KK-M-105",
    name: "زیبای مشکی خطی",
    cat: "اونیکس",
    size: "۲۹۰ × ۱۹۰",
    image: "images/prod_img_5.jpg",
    heroImage: "images/inprod_img_5.jpg",
    detailImage: "images/inprod_img_0.jpg",
    finish: "خطی",
    origin: "ایرانی",
    colors: "مشکی، طلایی",
  },
  {
    id: 6,
    code: "KK-M-106",
    name: "طوفان مشکی چرمی",
    cat: "کوارتزیت",
    size: "۳۲۵ × ۱۹۵",
    image: "images/prod_img_6.jpg",
    heroImage: "images/inprod_img_1.jpg",
    detailImage: "images/inprod_img_2.jpg",
    finish: "چرمی",
    origin: "ایرانی",
    colors: "مشکی، خاکستری",
  },
  {
    id: 7,
    code: "KK-M-107",
    name: "اسب مشکی راک",
    cat: "نیمه‌قیمتی",
    size: "۳۳۰ × ۱۹۰",
    image: "images/prod_img_7.jpg",
    heroImage: "images/inprod_img_2.jpg",
    detailImage: "images/inprod_img_3.jpg",
    finish: "طبیعی",
    origin: "ایرانی",
    colors: "مشکی، قهوه‌ای",
  },
  {
    id: 8,
    code: "KK-L-301",
    name: "آهک کرم روشن",
    cat: "سنگ آهک",
    size: "۲۸۰ × ۱۶۵",
    image: "images/prod_img_2.jpg",
    heroImage: "images/inprod_img_3.jpg",
    detailImage: "images/inprod_img_4.jpg",
    finish: "مات",
    origin: "ایرانی",
    colors: "کرم، بژ",
  },
  {
    id: 9,
    code: "KK-L-302",
    name: "آهک خاکستری مات",
    cat: "سنگ آهک",
    size: "۲۹۵ × ۱۷۰",
    image: "images/prod_img_3.jpg",
    heroImage: "images/inprod_img_4.jpg",
    detailImage: "images/inprod_img_5.jpg",
    finish: "مات",
    origin: "ایرانی",
    colors: "خاکستری، سفید",
  },
  {
    id: 10,
    code: "KK-L-303",
    name: "آهک بژ طبیعی",
    cat: "سنگ آهک",
    size: "۳۱۰ × ۱۸۰",
    image: "images/prod_img_4.jpg",
    heroImage: "images/inprod_img_5.jpg",
    detailImage: "images/inprod_img_0.jpg",
    finish: "طبیعی",
    origin: "ایرانی",
    colors: "بژ، کرم",
  },
];

export function getProduct(id: number): Product {
  return PRODUCTS.find(p => p.id === id) ?? PRODUCTS[0];
}
