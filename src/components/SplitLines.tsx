import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SplitLinesProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SplitLines: React.FC<SplitLinesProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
