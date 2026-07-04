import { motion, useReducedMotion } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /* Forwarded to the wrapper so it can participate in grid/flex layouts
     (e.g. height: 100% for equal-height grid cards). */
  style?: CSSProperties;
}

/** Scroll-triggered rise+fade. Fires once, respects reduced motion. */
const Reveal = ({ children, delay = 0, className, style }: RevealProps) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
