import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { img } from "../utils";

type BackgroundMusicContextValue = {
  muted: boolean;
  toggleMute: () => void;
};

const BackgroundMusicContext = createContext<BackgroundMusicContextValue>({
  muted: false,
  toggleMute: () => {},
});

export function useBackgroundMusic() {
  return useContext(BackgroundMusicContext);
}

export function BackgroundMusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem("koohkaran-mute") === "1";
    } catch {
      return false;
    }
  });

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || muted) return;
    try {
      await audio.play();
      startedRef.current = true;
    } catch {
      /* blocked until user interaction */
    }
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = muted;
    if (muted) return;
    /*
      موسیقی پس‌زمینه ۴۵۰ کیلوبایت است و حالا که المنت audio چیزی را از پیش
      بارگذاری نمی‌کند، همان فراخوانی play() است که دانلود را شروع می‌کند.
      درخواست آن در اولین رندر، رسم شدن صفحه را نزدیک یک ثانیه عقب می‌انداخت —
      و نور روی سنگ پیش از رسم شدن صفحه نمی‌تواند شروع شود — پس تلاش برای پخش
      تا بی‌کار شدن مرورگر صبر می‌کند. در هر صورت پخش خودکار در همه مرورگرهای
      اصلی نیازمند تعامل کاربر است و جایی که مجاز باشد فقط کمی دیرتر می‌شود.
    */
    const idle = "requestIdleCallback" in window ? window.requestIdleCallback.bind(window) : undefined;
    const id = idle ? idle(() => tryPlay(), { timeout: 2000 }) : window.setTimeout(tryPlay, 800);
    return () => { if (idle) window.cancelIdleCallback(id as number); else clearTimeout(id as number); };
  }, [muted, tryPlay]);

  useEffect(() => {
    const startOnInteraction = () => {
      tryPlay();
    };
    window.addEventListener("pointerdown", startOnInteraction);
    window.addEventListener("keydown", startOnInteraction);
    return () => {
      window.removeEventListener("pointerdown", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
    };
  }, [tryPlay]);

  const toggleMute = () => {
    setMuted(prev => {
      const next = !prev;
      try {
        localStorage.setItem("koohkaran-mute", next ? "1" : "0");
      } catch {
        /* ignore */
      }
      const audio = audioRef.current;
      if (audio) {
        audio.muted = next;
        if (!next) tryPlay();
      }
      return next;
    });
  };

  return (
    <BackgroundMusicContext.Provider value={{ muted, toggleMute }}>
      {/* preload="none": تا وقتی چیزی play() را صدا نزند، هیچ داده‌ای دانلود نمی‌شود */}
      <audio ref={audioRef} src={img("audio/background.mp3")} preload="none" />
      {children}
    </BackgroundMusicContext.Provider>
  );
}
