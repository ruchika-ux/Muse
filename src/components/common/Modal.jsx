import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';

/**
 * Minimal, accessible Modal dialog component
 */
export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl',
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/40 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              'relative w-full bg-[#FAF7F2] border border-stone-200/80 rounded-3xl shadow-soft-xl overflow-hidden z-10 my-8',
              maxWidth
            )}
          >
            {/* Header */}
            <div className="px-6 sm:px-8 pt-6 pb-4 flex items-start justify-between border-b border-stone-200/60 bg-white/70">
              <div>
                {title && (
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-xs text-stone-500 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
