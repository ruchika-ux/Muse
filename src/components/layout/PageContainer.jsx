import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import { fadeIn } from '../../utils/animationVariants';

/**
 * Standard page wrapper with consistent padding, max-width and soft entrance animation
 */
export function PageContainer({
  children,
  className = '',
  maxWidth = 'max-w-6xl',
  animate = true,
}) {
  const content = (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14', maxWidth, className)}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.main
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[calc(100vh-5rem)] flex flex-col"
    >
      {content}
    </motion.main>
  );
}
