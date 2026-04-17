'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // reducedMotion="user" tells Framer Motion to disable transforms when the
  // OS requests reduced motion, while still allowing opacity animations.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
