import type { ReactNode } from "react";

/*
  The line-icon set used across product detail pages.

  One flat record keyed by name, rather than a component per icon, because most
  of these are looked up from data: the spec rows, the applications grid and the
  highlight badges all carry an icon name alongside their label.
*/

export type IconName =
  | "stone" | "size" | "finish" | "origin" | "palette"
  | "natural" | "texture" | "durability" | "care"
  | "wall" | "facade" | "floor" | "stairs" | "kitchen" | "bath" | "pool" | "table"
  | "check" | "download" | "arrow" | "phone";

const PATHS: Record<IconName, ReactNode> = {
  // spec rows
  stone: <><path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" /><path d="M3 12.2 12 16.7l9-4.5" /><path d="M3 16.7 12 21.2l9-4.5" /></>,
  size: <><path d="M4 9V4h5" /><path d="M20 15v5h-5" /><path d="M4 4l6 6" /><path d="M20 20l-6-6" /></>,
  finish: <><path d="M3 8c2.5-2.4 5-2.4 7.5 0S18 10.4 21 8" /><path d="M3 12.5c2.5-2.4 5-2.4 7.5 0s7.5 2.4 10.5 0" /><path d="M3 17c2.5-2.4 5-2.4 7.5 0s7.5 2.4 10.5 0" /></>,
  origin: <><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" /></>,
  palette: <><circle cx="9" cy="9.5" r="4" /><circle cx="15" cy="9.5" r="4" /><circle cx="12" cy="15" r="4" /></>,

  // highlight badges
  natural: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" /><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12" /></>,
  texture: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M12 12l8-4.5" /><path d="M12 12v9" /><path d="M12 12 4 7.5" /></>,
  durability: <><path d="M12 3 5 6v5.5c0 4.4 2.9 7.7 7 9.5 4.1-1.8 7-5.1 7-9.5V6l-7-3Z" /><path d="M9 12l2.2 2.2L15.5 10" /></>,
  care: <><path d="M11 3.5l1.7 4.6 4.8 1.4-4.8 1.4L11 15.5 9.3 10.9 4.5 9.5l4.8-1.4L11 3.5Z" /><path d="M18 15l.7 1.9 1.8.6-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.6.7-1.9Z" /></>,

  // applications
  wall: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 9.7h18M3 14.3h18" /><path d="M9 5v4.7M15 9.7v4.6M9 14.3V19" /></>,
  facade: <><path d="M4 21V7l8-4 8 4v14" /><path d="M3 21h18" /><rect x="8" y="9.5" width="3" height="3" /><rect x="13" y="9.5" width="3" height="3" /><path d="M10 21v-4.5h4V21" /></>,
  floor: <><path d="M4 20 8 6h8l4 14Z" /><path d="M6.6 11.4h10.8" /><path d="M5.3 15.7h13.4" /><path d="M12 6v14" /></>,
  stairs: <><path d="M3 20h4.5v-4h4.5v-4h4.5V8H21" /><path d="M3 20v-3.5" /></>,
  kitchen: <><path d="M3 11h18" /><path d="M5 11v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6" /><path d="M12 11V7a3 3 0 0 1 3-3h1.5" /><circle cx="12" cy="15" r="1.2" /></>,
  bath: <><path d="M3 11h18v3.5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V11Z" /><path d="M6.5 11V6.2a2 2 0 0 1 4 0" /><path d="M7 19.5 6 21.5M17 19.5l1 2" /></>,
  pool: <><path d="M3 15c2-2.2 4.2-2.2 6.2 0s4.2 2.2 6.2 0 3.6-1.9 5.6-.2" /><path d="M3 19.4c2-2.2 4.2-2.2 6.2 0s4.2 2.2 6.2 0 3.6-1.9 5.6-.2" /><path d="M8 12.4V5.6a2 2 0 0 1 4 0" /><path d="M8 8.6h4" /></>,
  table: <><path d="M3 9.5h18" /><path d="M5.2 9.5 6.8 5h10.4l1.6 4.5" /><path d="M6.5 9.5V19M17.5 9.5V19" /></>,

  // ui
  check: <path d="M4.5 12.4 9 16.9 19.5 6.4" />,
  download: <><path d="M12 4v10.5" /><path d="M8 11l4 4 4-4" /><path d="M5 19.5h14" /></>,
  arrow: <><path d="M4 12h14" /><path d="M13 7l5 5-5 5" /></>,
  phone: <path d="M6.4 3.5h3l1.5 3.8-1.9 1.4a11.5 11.5 0 0 0 5.3 5.3l1.4-1.9 3.8 1.5v3a1.9 1.9 0 0 1-2.1 1.9A16.3 16.3 0 0 1 4.5 5.6a1.9 1.9 0 0 1 1.9-2.1Z" />,
};

export default function Icon({ name, size = 20, stroke = 1.5 }: { name: IconName; size?: number; stroke?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={{ display: "block", flexShrink: 0 }}
    >
      {PATHS[name]}
    </svg>
  );
}
