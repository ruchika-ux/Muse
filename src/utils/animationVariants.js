/**
 * Restrained, editorial Framer Motion animation presets
 * Provides subtle fades, gentle slide-ups, and soft card hover behaviors.
 */

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const slideUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.25 } },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};
