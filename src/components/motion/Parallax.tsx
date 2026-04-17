'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function Parallax({ children, speed = 0.15, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </div>
  );
}
