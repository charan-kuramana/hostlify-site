import { useReducedMotion } from "motion/react";
import { ChevronDown, MessageCircle, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { videoHero } from "@/content/home";
import { whatsappHref } from "@/content/site";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { WordReveal } from "@/components/motion/WordReveal";
import { RotatingWords } from "./RotatingWords";

type Mode = "idle" | "video" | "poster";
type NetworkInfo = { saveData?: boolean; effectiveType?: string };

const d = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

/**
 * Full-screen cinematic landing with the product film.
 * Performance: the video is NOT in the pre-rendered HTML. It is attached only after the page has loaded and the
 * main thread is idle, so it never competes with first paint (Lighthouse). Data-saver / 2G visitors and reduced-motion
 * visitors get the still poster instead (with a play button). Plays muted (autoplay policy), loops, and pauses when
 * off-screen or when the tab is hidden. Pause + sound controls satisfy WCAG 2.2.2 for moving media.
 */
export function VideoHero({ productAnchor }: { productAnchor: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("idle");
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(true);
  const wa = whatsappHref();

  const paused = userPaused ?? Boolean(reduce);

  // Start the film on the visitor's first interaction (pointer, touch, scroll, key) — near-instant for real people —
  // or 3s after load as a fallback. Video download + decode is heavy main-thread/GPU work; keeping it out of the
  // page-load window protects responsiveness (TBT) while the poster (the film's first frame) is already showing.
  useEffect(() => {
    let started = false;
    let timer: number | undefined;
    const events = ["pointermove", "pointerdown", "touchstart", "scroll", "keydown", "wheel"] as const;
    const start = () => {
      if (started) return;
      started = true;
      cleanup();
      const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
      const slow = Boolean(conn?.saveData) || /(^|-)2g$/.test(conn?.effectiveType ?? "");
      setMode(slow || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "poster" : "video");
    };
    const onLoad = () => {
      timer = window.setTimeout(start, 3000);
    };
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      events.forEach((e) => window.removeEventListener(e, start));
    }
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return cleanup;
  }, []);

  // Pause while off-screen or when the tab is hidden.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.1 });
    io.observe(el);
    const onVis = () => setInView(document.visibilityState === "visible" && el.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Keep the element in sync with play/pause intent.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || mode !== "video") return;
    if (paused || !inView) v.pause();
    else v.play().catch(() => setMode("poster")); // autoplay blocked → fall back to the poster
  }, [mode, paused, inView]);

  const showVideo = mode === "video";
  const togglePlay = () => {
    if (mode === "poster") setMode("video");
    setUserPaused(!paused);
    track("video_play", { location: "video_hero", action: paused ? "play" : "pause" });
  };

  return (
    <section
      ref={sectionRef}
      aria-label={videoHero.videoLabel}
      className="relative isolate -mt-16 flex h-[calc(100svh-2.5rem)] max-h-[1000px] min-h-[600px] items-start overflow-hidden bg-brand-950 lg:-mt-[72px]"
    >
      {/* Media layer */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Base: brand night gradient (what first paint shows) */}
        <div className="absolute inset-0 bg-gradient-night" />
        {/*
          The <video> is always in the pre-rendered HTML with a small first-frame poster (~30 KB), so the poster is the
          LCP element. The 4 MB film is attached later (src set after load/idle); its first frame is the same element at
          the same size, so it does not register as a new, later LCP. Poster = first frame, so the start is seamless.
          Plays muted; its content is described via the section aria-label. If the film has narration, add a captions <track>.
        */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src={mode === "video" ? videoHero.video.src : undefined}
          poster={videoHero.video.poster}
          muted={muted}
          loop
          playsInline
          preload="none"
          width={1280}
          height={720}
          className="absolute inset-0 size-full object-cover object-[70%_center]"
        />
        {/* Readability scrims: strong on the left (text side), bottom fade into the next section */}
        <div className="absolute inset-0 bg-linear-to-r from-brand-950/95 via-brand-950/70 to-brand-950/10 max-md:bg-linear-to-t max-md:from-brand-950/95 max-md:via-brand-950/75 max-md:to-brand-950/40" />
        <div className="absolute inset-0 bg-dot-grid-dark opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-brand-950/60" />
      </div>

      {/* Copy */}
      {/* Top-anchored (not vertically centred) so a late web-font swap can't shift the whole block (CLS) */}
      <div className="relative container-page pt-[calc(4rem+11svh)] lg:pt-[calc(72px+14svh)]">
        <div className="max-w-2xl">
          <div className="enter" style={d(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-1.5 pr-4 pl-2 text-sm text-white">
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-accent-500 motion-safe:animate-pulse-ring" />
                <span className="relative size-2.5 rounded-full bg-accent-500" />
              </span>
              <span className="font-semibold">{videoHero.badge}</span>
              <span className="hidden text-brand-100/80 sm:inline">· {videoHero.badgeDetail}</span>
            </span>
          </div>

          <WordReveal
            as="h1"
            onMount
            delay={0.08}
            parts={[{ text: videoHero.titleStart }, { text: videoHero.titleHighlight, highlight: true }]}
            highlightClassName="text-gradient-dark"
            className="mt-6 text-[2.6rem] leading-[1.04] font-extrabold tracking-[-0.03em] text-white sm:text-display"
          />

          <p className="enter mt-5 font-display text-h3 font-semibold text-white" style={d(0.35)}>
            {videoHero.rotatingPrefix} <RotatingWords words={videoHero.rotating} paused={paused || !inView} className="text-accent-500" />
          </p>

          <p className="enter mt-5 max-w-xl text-lead text-brand-100/85" style={d(0.45)}>
            {videoHero.lead}
          </p>

          <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={d(0.55)}>
            <Magnetic className="inline-block w-full sm:w-auto">
              <Button
                href={videoHero.primary.href}
                variant="white"
                size="lg"
                arrow
                className="w-full sm:w-auto"
                onClick={() => track("cta_click", { location: "video_hero" })}
              >
                {videoHero.primary.label}
              </Button>
            </Magnetic>
            {wa && (
              <Button
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-white"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<MessageCircle aria-hidden="true" />}
                onClick={() => track("whatsapp_click", { location: "video_hero" })}
              >
                {videoHero.whatsapp}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href={`#${productAnchor}`}
        className="enter group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium text-white/75 hover:text-white sm:flex"
        style={d(0.9)}
      >
        {videoHero.scroll}
        <ChevronDown className="size-5 motion-safe:animate-float" aria-hidden="true" />
      </a>

      {/* Media controls */}
      <div className="absolute bottom-5 left-4 flex gap-2 sm:bottom-6 sm:left-6 lg:left-8">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={paused ? videoHero.controls.play : videoHero.controls.pause}
          className="grid size-11 place-items-center rounded-full border border-white/20 bg-brand-950/50 text-white transition-colors hover:bg-brand-950/80"
        >
          {paused ? <Play className="size-4 fill-current" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
        </button>
        {showVideo && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? videoHero.controls.unmute : videoHero.controls.mute}
            aria-pressed={!muted}
            className="grid size-11 place-items-center rounded-full border border-white/20 bg-brand-950/50 text-white transition-colors hover:bg-brand-950/80"
          >
            {muted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
          </button>
        )}
      </div>
    </section>
  );
}
