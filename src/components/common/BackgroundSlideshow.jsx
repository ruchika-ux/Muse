import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { HERO_BACKGROUND_IMAGES } from '../../data/heroImages';

/**
 * BackgroundSlideshow Component
 * 
 * Displays vivid, full-screen background photography with smooth crossfades,
 * subtle Ken Burns scale animation, preloading, and visibility-aware pause.
 */
export function BackgroundSlideshow({
  images = HERO_BACKGROUND_IMAGES,
  intervalDuration = 7000, // 7 seconds per slide
  className = '',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all images on mount so transitions are immediate with zero flash
  useEffect(() => {
    images.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = img.url;
    });
  }, [images]);

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Automatically cycle through images, pausing when browser tab is inactive
  useEffect(() => {
    let timer = null;

    const startTimer = () => {
      if (!timer) {
        timer = setInterval(() => {
          if (document.visibilityState === 'visible') {
            nextSlide();
          }
        }, intervalDuration);
      }
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopTimer();
      } else {
        startTimer();
      }
    };

    startTimer();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [nextSlide, intervalDuration]);

  const currentImage = images[currentIndex];

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {/* Animated Full-Screen Photo Layer */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              opacity: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] },
              scale: { duration: intervalDuration / 1000 + 1, ease: 'easeOut' },
            },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentImage.url}
            alt={currentImage.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Layer 1: Very subtle dark overlay to enrich photo saturation without washing it out */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Layer 2: Seamless soft fade at the bottom into the #FAF7F2 page content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent via-60% to-[#FAF7F2]" />

      {/* Subtle travel-journal location pill at bottom right */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/60 backdrop-blur-md text-cream-100 text-[11px] font-medium tracking-wider uppercase border border-white/15 shadow-sm">
        <MapPin className="w-3 h-3 text-stone-300" />
        <span>{currentImage.location}</span>
      </div>
    </div>
  );
}
