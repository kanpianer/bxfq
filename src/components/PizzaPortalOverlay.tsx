import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, ArrowDown, Loader2 } from 'lucide-react';
import bxfqScreenshot from '../assets/portal/bxfq.webp';
import jkdhScreenshot from '../assets/portal/jkdh.webp';
import zstbScreenshot from '../assets/portal/zstb.webp';

export type PizzaSliceId = 'bxfq' | 'jkdh' | 'zstb';

interface PizzaSliceConfig {
  id: PizzaSliceId;
  title: string;
  subtitle: string;
  domain: string;
  url: string;
  isCurrentSite: boolean;
  startDeg: number;
  endDeg: number;
  bisectorDeg: number;
  screenshot: string;
  surfaceGradient: string;
  accentGlow: string;
  crustHighlight: string;
  crustTop: string;
  crustMid: string;
  actionLabel: string;
}

const PIZZA_SLICES: PizzaSliceConfig[] = [
  {
    id: 'bxfq',
    title: '不想翻墙',
    subtitle: '免费备用梯子首选',
    domain: 'bxfq.lsd.tw',
    url: 'https://bxfq.lsd.tw',
    isCurrentSite: true,
    startDeg: -150,
    endDeg: -30,
    bisectorDeg: -90,
    screenshot: bxfqScreenshot,
    surfaceGradient:
      'radial-gradient(circle at 50% 24%, #141720 0%, #0b0d13 58%, #07080c 100%)',
    accentGlow: 'rgba(203, 213, 225, 0.12)',
    crustHighlight: 'rgba(255, 226, 178, 0.46)',
    crustTop: '#b88246',
    crustMid: '#633e1f',
    actionLabel: '直接进入首页',
  },
  {
    id: 'jkdh',
    title: '家宽导航',
    subtitle: '精选“家宽IP / 住宅IP”机场与 VPS',
    domain: 'jkdh.lsd.tw',
    url: 'https://jkdh.lsd.tw',
    isCurrentSite: false,
    startDeg: -30,
    endDeg: 90,
    bisectorDeg: 30,
    screenshot: jkdhScreenshot,
    surfaceGradient:
      'radial-gradient(circle at 75% 68%, #101e34 0%, #0a1424 58%, #060c17 100%)',
    accentGlow: 'rgba(96, 165, 250, 0.16)',
    crustHighlight: 'rgba(220, 228, 240, 0.44)',
    crustTop: '#9c7c58',
    crustMid: '#513c2a',
    actionLabel: '前往家宽导航',
  },
  {
    id: 'zstb',
    title: '纸上谈兵',
    subtitle: '主流翻墙工具使用教程',
    domain: 'zstb.lsd.tw',
    url: 'https://zstb.lsd.tw',
    isCurrentSite: false,
    startDeg: 90,
    endDeg: 210,
    bisectorDeg: 150,
    screenshot: zstbScreenshot,
    surfaceGradient:
      'radial-gradient(circle at 25% 68%, #191713 0%, #100f0c 58%, #090807 100%)',
    accentGlow: 'rgba(232, 214, 178, 0.12)',
    crustHighlight: 'rgba(255, 224, 174, 0.46)',
    crustTop: '#b68148',
    crustMid: '#5f3c20',
    actionLabel: '前往纸上谈兵',
  },
];

const AUTO_ENTER_SECONDS = 10;
const WALL_DEPTH_PX = 44;
const SEAM_GAP_OFFSET_PX = 0.9;
const HOVER_SLIDE_PX = 15;
const HOVER_LIFT_Z_PX = 36;
const HOVER_TILT_DEG = 5.5;

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const buildSectorClipPath = (
  originX: number,
  originY: number,
  startDeg: number,
  endDeg: number,
  radius: number
): string => {
  const points: string[] = [`${originX.toFixed(1)}px ${originY.toFixed(1)}px`];
  const steps = 6;
  for (let i = 0; i <= steps; i++) {
    const rad = degToRad(startDeg + ((endDeg - startDeg) * i) / steps);
    const px = originX + radius * Math.cos(rad);
    const py = originY + radius * Math.sin(rad);
    points.push(`${px.toFixed(1)}px ${py.toFixed(1)}px`);
  }
  return `polygon(${points.join(', ')})`;
};

interface SliceBrandIconProps {
  id: PizzaSliceId;
}

const SliceBrandIcon: React.FC<SliceBrandIconProps> = ({ id }) => {
  if (id === 'bxfq') {
    return (
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className="h-8 w-8 sm:h-11 sm:w-11 md:h-12 md:w-12 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]"
      />
    );
  }
  if (id === 'jkdh') {
    return (
      <img
        src="/images/jiakuan-logo.png"
        alt=""
        aria-hidden="true"
        className="h-5 w-5 sm:h-6 sm:w-6 rounded-[4px] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
      />
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 sm:h-6 sm:w-6 text-amber-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
    >
      <path d="M5 4.5C8 3.8 11 4.8 14 4.2C16.5 3.7 18.2 4.3 19 4.7V19.2C17.2 18.6 14.5 18.9 12 19.4C9.5 19.9 6.8 19.3 5 18.8V4.5Z" />
      <path d="M8.5 8.8H15.5" />
      <path d="M8.5 12.2H14.5" />
      <path d="M8.5 15.4H12.5" />
    </svg>
  );
};

interface PizzaPortalOverlayProps {
  onEnterCurrentSite: () => void;
}

export const PizzaPortalOverlay: React.FC<PizzaPortalOverlayProps> = ({
  onEnterCurrentSite,
}) => {
  const [viewport, setViewport] = useState<{ width: number; height: number }>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  }));
  const [hoveredId, setHoveredId] = useState<PizzaSliceId | null>(null);
  const [exitingId, setExitingId] = useState<PizzaSliceId | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(AUTO_ENTER_SECONDS);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const exitingRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);
  const autoIntervalRef = useRef<number | null>(null);
  const autoTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);

  const clearAutoTimers = useCallback(() => {
    if (autoIntervalRef.current !== null) {
      window.clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
    }
    if (autoTimeoutRef.current !== null) {
      window.clearTimeout(autoTimeoutRef.current);
      autoTimeoutRef.current = null;
    }
  }, []);

  useLayoutEffect(() => {
    const updateSize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMq = () => {
      prefersReducedMotionRef.current = mq.matches;
      setPrefersReducedMotion(mq.matches);
    };
    syncMq();
    mq.addEventListener('change', syncMq);
    return () => mq.removeEventListener('change', syncMq);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlGutter = html.style.scrollbarGutter;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    html.style.scrollbarGutter = 'auto';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      html.style.scrollbarGutter = prevHtmlGutter;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleSelectSlice = useCallback(
    (slice: PizzaSliceConfig) => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      clearAutoTimers();
      setHoveredId(slice.id);
      setExitingId(slice.id);

      const durationMs = prefersReducedMotionRef.current ? 180 : slice.isCurrentSite ? 470 : 430;
      exitTimerRef.current = window.setTimeout(() => {
        exitTimerRef.current = null;
        if (slice.isCurrentSite) {
          onEnterCurrentSite();
        } else {
          window.location.href = slice.url;
        }
      }, durationMs);
    },
    [clearAutoTimers, onEnterCurrentSite]
  );

  const startAutoEnterCountdown = useCallback(() => {
    clearAutoTimers();
    setSecondsLeft(AUTO_ENTER_SECONDS);
    const startTime = Date.now();

    autoIntervalRef.current = window.setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, AUTO_ENTER_SECONDS - elapsedSec);
      setSecondsLeft(remaining);
    }, 250);

    autoTimeoutRef.current = window.setTimeout(() => {
      clearAutoTimers();
      setSecondsLeft(0);
      handleSelectSlice(PIZZA_SLICES[0]);
    }, AUTO_ENTER_SECONDS * 1000);
  }, [clearAutoTimers, handleSelectSlice]);

  // 10秒内未选择任意站点则自动进入「不想翻墙」
  useEffect(() => {
    startAutoEnterCountdown();

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        if (exitTimerRef.current !== null) {
          window.clearTimeout(exitTimerRef.current);
          exitTimerRef.current = null;
        }
        exitingRef.current = false;
        setExitingId(null);
        setHoveredId(null);
        startAutoEnterCountdown();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      clearAutoTimers();
    };
  }, [clearAutoTimers, startAutoEnterCountdown]);

  const { width, height } = viewport;
  const isCompactWidth = width < 640;
  const cx = width * 0.5;
  const cy = width >= height ? height * 0.54 : height * 0.48;
  const sectorRadius = Math.hypot(width, height) * 1.45;
  const wallLen = Math.ceil(Math.hypot(width, height) * 1.35);

  const activeSlice = exitingId ? PIZZA_SLICES.find((s) => s.id === exitingId) : null;
  const isEnteringCurrentSite = exitingId === 'bxfq';

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden select-none"
      role="region"
      aria-label="站点分区导航覆盖层"
    >
      {/* Dark shadowed tray / cut crevice backdrop behind the three pizza slices */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#050608] transition-opacity duration-200 ease-out"
        style={{
          opacity: isEnteringCurrentSite ? 0 : 1,
        }}
      >
        {/* Shown behind departing slice when navigating to jkdh or zstb */}
        {activeSlice && !activeSlice.isCurrentSite && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2">
              <Loader2 className="h-4 w-4 animate-spin text-white/90" />
              <span className="text-sm font-medium text-white">
                正在前往 {activeSlice.title}
              </span>
              <span className="text-xs font-mono text-white/60">
                {activeSlice.domain}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3D Pizza Slices */}
      {PIZZA_SLICES.map((slice) => {
        const bisectorRad = degToRad(slice.bisectorDeg);
        const ux = Math.cos(bisectorRad);
        const uy = Math.sin(bisectorRad);
        const ax = -uy;
        const ay = ux;

        const tipX = cx + ux * SEAM_GAP_OFFSET_PX;
        const tipY = cy + uy * SEAM_GAP_OFFSET_PX;

        const isHovered = hoveredId === slice.id && !exitingId;
        const isOtherHovered = hoveredId !== null && hoveredId !== slice.id && !exitingId;
        const isThisExiting = exitingId === slice.id;
        const isOtherExiting = exitingId !== null && exitingId !== slice.id;
        const showHoverBackground = isHovered || isThisExiting;

        const topFaceClipPath = buildSectorClipPath(
          tipX,
          tipY,
          slice.startDeg,
          slice.endDeg,
          sectorRadius
        );
        const shadowClipPath = buildSectorClipPath(
          tipX,
          tipY,
          slice.startDeg,
          slice.endDeg,
          sectorRadius
        );
        const hitClipPath = buildSectorClipPath(
          cx,
          cy,
          slice.startDeg,
          slice.endDeg,
          sectorRadius
        );

        let clearDist = cy + 280;
        if (slice.id === 'jkdh') {
          clearDist = (width - cx) / 0.8660254 + 280;
        } else if (slice.id === 'zstb') {
          clearDist = cx / 0.8660254 + 280;
        }

        // Compute 3D transform for the slice prism
        let prismTransform = `translate3d(0px, 0px, 0px) rotate3d(${ax.toFixed(4)}, ${ay.toFixed(4)}, 0, 0deg)`;
        let prismOpacity = 1;
        let prismTransition =
          'transform 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms ease-out';

        if (isThisExiting) {
          if (prefersReducedMotion) {
            prismTransform = 'translate3d(0px, 0px, 0px)';
            prismOpacity = 0;
            prismTransition = 'opacity 180ms ease-out';
          } else {
            const tx = ux * clearDist;
            const ty = uy * clearDist;
            prismTransform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 90px) rotate3d(${ax.toFixed(4)}, ${ay.toFixed(4)}, 0, 8.5deg)`;
            prismOpacity = slice.isCurrentSite ? 0.98 : 0.96;
            prismTransition =
              'transform 450ms cubic-bezier(0.38, 0.02, 0.22, 1), opacity 420ms ease-out';
          }
        } else if (isOtherExiting) {
          if (isEnteringCurrentSite) {
            if (prefersReducedMotion) {
              prismOpacity = 0;
              prismTransition = 'opacity 180ms ease-out';
            } else {
              const tx = ux * (clearDist * 0.72);
              const ty = uy * (clearDist * 0.72);
              prismTransform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, -16px) rotate3d(${ax.toFixed(4)}, ${ay.toFixed(4)}, 0, 2deg)`;
              prismOpacity = 0;
              prismTransition =
                'transform 380ms cubic-bezier(0.32, 0.04, 0.22, 1) 55ms, opacity 300ms ease-out 55ms';
            }
          } else {
            prismTransform = 'translate3d(0px, 0px, -24px)';
            prismOpacity = 0.22;
            prismTransition = 'transform 340ms ease-out, opacity 300ms ease-out';
          }
        } else if (isHovered) {
          if (prefersReducedMotion) {
            prismTransform = `translate3d(${(ux * 6).toFixed(1)}px, ${(uy * 6).toFixed(1)}px, 0px)`;
          } else {
            const tx = ux * HOVER_SLIDE_PX;
            const ty = uy * HOVER_SLIDE_PX;
            prismTransform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${HOVER_LIFT_Z_PX}px) rotate3d(${ax.toFixed(4)}, ${ay.toFixed(4)}, 0, ${HOVER_TILT_DEG}deg)`;
          }
        } else if (isOtherHovered) {
          prismTransform = prefersReducedMotion
            ? 'translate3d(0px, 0px, 0px)'
            : 'translate3d(0px, 0px, -12px)';
        }

        const stageZIndex = isThisExiting ? 35 : isHovered ? 30 : isOtherHovered ? 8 : 15;

        let screenshotBoxStyle: React.CSSProperties;
        let labelStyle: React.CSSProperties;

        if (slice.id === 'bxfq') {
          const topHeightPct = Math.max(66, Math.round((cy / Math.max(height, 1)) * 100) + 16);
          screenshotBoxStyle = {
            left: '-8%',
            top: '-8%',
            width: '116%',
            height: `${topHeightPct}%`,
          };
          labelStyle = {
            left: '50%',
            top: isCompactWidth ? '21%' : '23%',
            transform: 'translate(-50%, -50%)',
          };
        } else if (slice.id === 'jkdh') {
          screenshotBoxStyle = {
            left: '42%',
            top: '-8%',
            width: '66%',
            height: '116%',
          };
          labelStyle = {
            left: '75%',
            top: isCompactWidth ? '72%' : '68%',
            transform: 'translate(-50%, -50%)',
          };
        } else {
          screenshotBoxStyle = {
            left: '-8%',
            top: '-8%',
            width: '66%',
            height: '116%',
          };
          labelStyle = {
            left: '25%',
            top: isCompactWidth ? '72%' : '68%',
            transform: 'translate(-50%, -50%)',
          };
        }

        const upperClearMask =
          'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.4) 82%, rgba(0,0,0,0.15) 100%)';
        const bottomHeavyBlurMask =
          'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 32%, rgba(0,0,0,0.52) 62%, rgba(0,0,0,0.1) 86%, rgba(0,0,0,0) 100%)';

        const wallGradient = `linear-gradient(to bottom, ${slice.crustHighlight} 0%, ${slice.crustTop} 6%, ${slice.crustMid} 30%, #2a180d 56%, #0e0a09 80%, #050608 100%)`;

        return (
          <React.Fragment key={slice.id}>
            {/* 3D Slice Stage */}
            <div
              className="pointer-events-none fixed inset-0"
              style={{
                zIndex: stageZIndex,
                perspective: '1150px',
                perspectiveOrigin: `${cx}px ${cy}px`,
              }}
            >
              {/* Ambient shadow cast beneath lifted slice onto neighbors */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
                style={{
                  opacity: isHovered ? 0.78 : 0,
                  filter: 'blur(22px)',
                }}
              >
                <div
                  className="h-full w-full"
                  style={{
                    clipPath: shadowClipPath,
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 65%, transparent 100%)',
                    transform: `translate3d(${(ux * 6).toFixed(1)}px, ${(uy * 14).toFixed(1)}px, 0px)`,
                  }}
                />
              </div>

              {/* 3D Extruded Cut Thickness Walls (own preserve-3d layer cleanly behind flat top surface) */}
              <div
                className="pointer-events-none absolute inset-0 will-change-transform"
                style={{
                  zIndex: 2,
                  transformStyle: 'preserve-3d',
                  transformOrigin: `${tipX}px ${tipY}px`,
                  transform: prismTransform,
                  opacity: prismOpacity,
                  transition: prismTransition,
                }}
              >
                {/* Cut Thickness Wall 1 (startDeg edge) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  style={{
                    left: `${tipX}px`,
                    top: `${tipY}px`,
                    width: `${wallLen}px`,
                    height: `${WALL_DEPTH_PX}px`,
                    transformOrigin: '0 0',
                    transform: `rotateZ(${slice.startDeg}deg) rotateX(-90deg)`,
                    backfaceVisibility: 'visible',
                    backgroundImage: `${wallGradient}, repeating-linear-gradient(to bottom, rgba(255,225,175,0.035) 0px, rgba(255,225,175,0.035) 1px, transparent 1px, transparent 5px)`,
                    boxShadow: 'inset 0 1px 0 rgba(255, 236, 200, 0.16)',
                  }}
                />

                {/* Cut Thickness Wall 2 (endDeg edge) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute"
                  style={{
                    left: `${tipX}px`,
                    top: `${tipY}px`,
                    width: `${wallLen}px`,
                    height: `${WALL_DEPTH_PX}px`,
                    transformOrigin: '0 0',
                    transform: `rotateZ(${slice.endDeg}deg) rotateX(-90deg)`,
                    backfaceVisibility: 'visible',
                    backgroundImage: `${wallGradient}, repeating-linear-gradient(to bottom, rgba(255,225,175,0.035) 0px, rgba(255,225,175,0.035) 1px, transparent 1px, transparent 5px)`,
                    boxShadow: 'inset 0 1px 0 rgba(255, 236, 200, 0.16)',
                  }}
                />
              </div>

              {/* Slice Top Surface (Flat 2D-clipped quad transformed identically in 3D perspective; avoids preserve-3d BSP culling) */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0a0c11] will-change-transform"
                style={{
                  zIndex: 3,
                  clipPath: topFaceClipPath,
                  transformOrigin: `${tipX}px ${tipY}px`,
                  transform:
                    isHovered || isThisExiting ? `${prismTransform} scale(1.028)` : prismTransform,
                  opacity: prismOpacity,
                  transition: prismTransition,
                }}
              >
                {/* Viewport-aligned surface layer */}
                <div className="pointer-events-none relative h-full w-full">
                    {/* Default matte themed pizza-slice surface (low-contrast site palette when not hovered) */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: slice.surfaceGradient,
                      }}
                    />

                    {/* Screenshot Background: hidden at rest, revealed ONLY on hover — clearer at top, progressively blurred toward bottom */}
                    <div
                      className="pointer-events-none absolute overflow-hidden transition-all duration-300 ease-out"
                      style={{
                        ...screenshotBoxStyle,
                        opacity: showHoverBackground ? 1 : 0,
                        transform: showHoverBackground ? 'translateY(0px)' : 'translateY(12px)',
                      }}
                    >
                      {/* Upper semi-clear layer (1.5px soft polish): readable/recognizable UI near top, fading out downward */}
                      <img
                        src={slice.screenshot}
                        alt=""
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover"
                        style={{
                          objectPosition: slice.id === 'bxfq' ? '50% 25%' : '50% 40%',
                          filter: 'blur(1.5px) brightness(0.86) contrast(1.08) saturate(1.12)',
                          transform: 'scale(1.03)',
                          maskImage: upperClearMask,
                          WebkitMaskImage: upperClearMask,
                        }}
                      />

                      {/* Lower heavy-blur gradient layer (18px): stronger blur at bottom, fading smoothly upward */}
                      <img
                        src={slice.screenshot}
                        alt=""
                        loading="eager"
                        decoding="async"
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                        style={{
                          objectPosition: slice.id === 'bxfq' ? '50% 25%' : '50% 40%',
                          filter: 'blur(18px) brightness(0.65) contrast(1.06) saturate(1.12)',
                          transform: 'scale(1.09)',
                          maskImage: bottomHeavyBlurMask,
                          WebkitMaskImage: bottomHeavyBlurMask,
                        }}
                      />
                    </div>

                    {/* Tight local scrim behind foreground text/icons so label contrast stays sharp */}
                    <div
                      className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(ellipse ${
                          slice.id === 'bxfq' ? '44% 34%' : '36% 32%'
                        } at ${
                          slice.id === 'bxfq'
                            ? '50% 23%'
                            : slice.id === 'jkdh'
                              ? '75% 68%'
                              : '25% 68%'
                        }, rgba(6, 7, 10, 0.78) 0%, rgba(6, 7, 10, 0.48) 54%, rgba(6, 7, 10, 0.14) 100%)`,
                        opacity: showHoverBackground ? 1 : 0.2,
                      }}
                    />

                    {/* Ambient hover accent glow */}
                    <div
                      className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${
                          slice.id === 'bxfq'
                            ? '50% 25%'
                            : slice.id === 'jkdh'
                              ? '74% 66%'
                              : '26% 66%'
                        }, ${slice.accentGlow} 0%, transparent 56%)`,
                        opacity: showHoverBackground ? 0.9 : 0.3,
                      }}
                    />

                    {/* Crisp Slice Title, Subtitle & Icons (NO blur, NO URL display) */}
                    <div
                      className={`pointer-events-none absolute flex flex-col items-center text-center transition-transform duration-300 ease-out ${
                        slice.id === 'bxfq'
                          ? 'w-[280px] sm:w-[460px] md:w-[580px]'
                          : 'w-[176px] sm:w-[320px] md:w-[380px]'
                      }`}
                      style={{
                        ...labelStyle,
                        transform: `${labelStyle.transform}${
                          isHovered ? ' translateY(-2px)' : ''
                        }`,
                      }}
                    >
                      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
                        <SliceBrandIcon id={slice.id} />
                        <h2
                          className={`m-0 font-sans font-bold tracking-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)] leading-tight ${
                            slice.id === 'bxfq'
                              ? 'text-3xl sm:text-5xl md:text-[56px]'
                              : 'text-xl sm:text-3xl md:text-[38px]'
                          }`}
                        >
                          {slice.title}
                        </h2>
                      </div>

                      <p
                        className={`font-sans leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] ${
                          slice.id === 'bxfq'
                            ? 'mt-2.5 sm:mt-3.5 text-sm sm:text-lg md:text-[21px]'
                            : 'mt-2 sm:mt-2.5 text-[11px] sm:text-sm md:text-[15px]'
                        }`}
                      >
                        {slice.subtitle}
                      </p>

                      <div
                        className={`mt-3 sm:mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] sm:text-xs font-medium transition-all duration-300 ${
                          isHovered
                            ? 'border-amber-200/50 bg-white/15 text-white shadow-[0_6px_18px_rgba(0,0,0,0.5)]'
                            : 'border-white/15 bg-white/[0.06] text-white/80'
                        }`}
                      >
                        <span>
                          {slice.isCurrentSite && !exitingId && secondsLeft > 0
                            ? `${slice.actionLabel} (${secondsLeft}s)`
                            : slice.actionLabel}
                        </span>
                        {slice.isCurrentSite ? (
                          <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delicate hairline Crust/Cut Edge Bevel along startDeg ray (inside wedge) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute transition-opacity duration-300"
                    style={{
                      left: `${tipX}px`,
                      top: `${tipY}px`,
                      width: `${wallLen}px`,
                      height: '1px',
                      transformOrigin: '0 0',
                      transform: `rotate(${slice.startDeg}deg)`,
                      background: isHovered
                        ? 'rgba(255, 232, 192, 0.42)'
                        : 'rgba(255, 224, 166, 0.14)',
                    }}
                  />

                  {/* Delicate hairline Crust/Cut Edge Bevel along endDeg ray (inside wedge) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute transition-opacity duration-300"
                    style={{
                      left: `${tipX}px`,
                      top: `${tipY - 1}px`,
                      width: `${wallLen}px`,
                      height: '1px',
                      transformOrigin: '0 1px',
                      transform: `rotate(${slice.endDeg}deg)`,
                      background: isHovered
                        ? 'rgba(255, 232, 192, 0.42)'
                        : 'rgba(255, 224, 166, 0.14)',
                    }}
                  />
                </div>
            </div>

            {/* Stationary Hit Target (prevents hover flicker near cut edges while slice lifts/slides) */}
            <button
              type="button"
              disabled={exitingId !== null}
              aria-label={`进入 ${slice.title} (${slice.domain}) — ${slice.subtitle}`}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'touch' && !exitingId) {
                  setHoveredId(slice.id);
                }
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== 'touch') {
                  setHoveredId((prev) => (prev === slice.id ? null : prev));
                }
              }}
              onFocus={() => {
                if (!exitingId) setHoveredId(slice.id);
              }}
              onBlur={() => {
                setHoveredId((prev) => (prev === slice.id ? null : prev));
              }}
              onClick={() => handleSelectSlice(slice)}
              className="fixed inset-0 z-40 cursor-pointer border-0 bg-transparent p-0 focus:outline-none disabled:cursor-default"
              style={{
                clipPath: hitClipPath,
              }}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
