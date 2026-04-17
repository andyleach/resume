'use client';

import { motion } from 'motion/react';

type Props = { children: string; className?: string; delay?: number };

export function SplitText({ children, className, delay = 0 }: Props) {
  const chars = Array.from(children);
  return (
    <span className={className} aria-label={children}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          data-char
          aria-hidden="true"
          initial={{ opacity: 0, y: '0.4em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}
