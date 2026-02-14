import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export type WalkthroughStep = {
  target: string; // value of data-tour
  title: string;
  description: string;
  advanceOnTargetClick?: boolean;
};

type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type Props = {
  open: boolean;
  steps: WalkthroughStep[];
  stepIndex: number;
  onStepIndexChange: (nextIndex: number) => void;
  onClose: () => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const queryTarget = (target: string) =>
  document.querySelector<HTMLElement>(`[data-tour="${CSS.escape(target)}"]`);

export default function WalkthroughTour({ open, steps, stepIndex, onStepIndexChange, onClose }: Props) {
  const step = steps[stepIndex];
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  const [rect, setRect] = useState<Rect | null>(null);
  const [tooltipSize, setTooltipSize] = useState<{ w: number; h: number }>({ w: 360, h: 140 });

  const canPrev = stepIndex > 0;
  const canNext = stepIndex < steps.length - 1;

  const close = () => onClose();
  const prev = () => canPrev && onStepIndexChange(stepIndex - 1);
  const next = () => (canNext ? onStepIndexChange(stepIndex + 1) : onClose());

  useEffect(() => {
    if (!open) return;

    const updateViewport = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setRect(null);
      return;
    }

    const el = step ? queryTarget(step.target) : null;
    if (!el) {
      setRect(null);
      return;
    }

    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    } catch {
      // ignore
    }

    const pad = 10;

    const compute = () => {
      const r = el.getBoundingClientRect();
      const x = clamp(Math.round(r.left - pad), 0, viewport.w);
      const y = clamp(Math.round(r.top - pad), 0, viewport.h);
      const w = clamp(Math.round(r.width + pad * 2), 0, viewport.w - x);
      const h = clamp(Math.round(r.height + pad * 2), 0, viewport.h - y);
      setRect({ x, y, w, h });
    };

    const raf = window.requestAnimationFrame(compute);

    const onScroll = () => compute();
    window.addEventListener('scroll', onScroll, true);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open, step, viewport.w, viewport.h]);

  useEffect(() => {
    if (!open || !step?.advanceOnTargetClick) return;

    const el = queryTarget(step.target);
    if (!el) return;

    const onClickCapture = () => {
      window.setTimeout(() => next(), 60);
    };

    el.addEventListener('click', onClickCapture, true);
    return () => el.removeEventListener('click', onClickCapture, true);
  }, [open, step?.target, step?.advanceOnTargetClick]);

  useLayoutEffect(() => {
    if (!open) return;
    if (!tooltipRef.current) return;

    const r = tooltipRef.current.getBoundingClientRect();
    if (r.width && r.height) {
      setTooltipSize({ w: Math.round(r.width), h: Math.round(r.height) });
    }
  }, [open, stepIndex, rect?.x, rect?.y, rect?.w, rect?.h]);

  const blocks = useMemo(() => {
    if (!rect) return null;

    const top = { left: 0, top: 0, width: viewport.w, height: rect.y };
    const left = { left: 0, top: rect.y, width: rect.x, height: rect.h };
    const right = {
      left: rect.x + rect.w,
      top: rect.y,
      width: Math.max(0, viewport.w - (rect.x + rect.w)),
      height: rect.h,
    };
    const bottom = {
      left: 0,
      top: rect.y + rect.h,
      width: viewport.w,
      height: Math.max(0, viewport.h - (rect.y + rect.h)),
    };

    return { top, left, right, bottom };
  }, [rect, viewport.h, viewport.w]);

  const tooltipPos = useMemo(() => {
    if (!rect) {
      return { left: Math.round((viewport.w - tooltipSize.w) / 2), top: 88 };
    }

    const desiredLeft = rect.x + rect.w / 2 - tooltipSize.w / 2;
    const left = clamp(Math.round(desiredLeft), 12, Math.max(12, viewport.w - tooltipSize.w - 12));

    const belowTop = rect.y + rect.h + 12;
    const aboveTop = rect.y - tooltipSize.h - 12;
    const top = belowTop + tooltipSize.h <= viewport.h - 12 ? Math.round(belowTop) : Math.round(Math.max(12, aboveTop));

    return { left, top };
  }, [rect, tooltipSize.h, tooltipSize.w, viewport.h, viewport.w]);

  if (!open || !step) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[20000] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        {/* Click-blocking overlays (leave a hole for the target) */}
        {blocks && (
          <>
            {Object.values(blocks).map((b, idx) => (
              <div
                key={idx}
                className="fixed bg-black/55 backdrop-blur-[2px] pointer-events-auto"
                style={{ left: b.left, top: b.top, width: b.width, height: b.height }}
                onClick={() => {
                  /* keep focus on tour; clicking outside does nothing */
                }}
              />
            ))}
            {/* Highlight ring */}
            <div
              className="fixed pointer-events-none rounded-3xl border border-white/35 shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_10px_40px_rgba(0,0,0,0.55)]"
              style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
            />
          </>
        )}

        {/* Tooltip */}
        <motion.div
          ref={tooltipRef}
          className="fixed pointer-events-auto"
          style={{ left: tooltipPos.left, top: tooltipPos.top, width: 360 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
        >
          <div className="rounded-2xl border border-white/15 bg-black/55 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-white font-semibold text-sm">{step.title}</div>
                <div className="text-white/70 text-xs mt-1 leading-relaxed">{step.description}</div>
              </div>
              <button
                onClick={close}
                className="shrink-0 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 p-2 text-white/80"
                aria-label="Close walkthrough"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-white/50 text-[11px]">
                Step {stepIndex + 1} of {steps.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  disabled={!canPrev}
                  className="rounded-full bg-white/10 hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-white/10 border border-white/10 px-3 py-1.5 text-white/85 text-xs inline-flex items-center gap-1"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                <button
                  onClick={next}
                  className="rounded-full bg-white/15 hover:bg-white/20 border border-white/10 px-3 py-1.5 text-white text-xs inline-flex items-center gap-1"
                >
                  {canNext ? 'Next' : 'Done'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {step.advanceOnTargetClick && (
              <div className="mt-3 text-white/55 text-[11px]">Tip: you can click the highlighted area to proceed.</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
