import type { ElementType, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type GlassCardSpan = 'sm' | 'md' | 'lg' | 'xl';

interface GlassCardProps {
  span?: GlassCardSpan;
  delay?: number;
  className?: string;
  id?: string;
  as?: ElementType;
  hoverLift?: boolean;
  children: ReactNode;
}

const spanClass: Record<GlassCardSpan, string> = {
  sm: 'span-sm',
  md: 'span-md',
  lg: 'span-lg',
  xl: 'span-xl',
};

const GlassCard = ({
  span = 'sm',
  delay = 0,
  className = '',
  id,
  as = 'section',
  hoverLift = true,
  children,
}: GlassCardProps) => {
  const prefersReduced = useReducedMotion();

  const variants = prefersReduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

  const classes = [
    'glass-card',
    spanClass[span],
    hoverLift ? 'hover-lift' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const MotionTag = motion(as);

  return (
    <MotionTag
      id={id}
      className={classes}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
};

export default GlassCard;
