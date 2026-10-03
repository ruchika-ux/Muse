import React from 'react';
import { cn } from '../../utils/helpers';
import { CATEGORY_META } from '../../data/seedData';

/**
 * Reusable Badge component with category-aware coloring
 */
export function Badge({
  children,
  category,
  variant = 'default',
  size = 'sm',
  className = '',
}) {
  const meta = category ? CATEGORY_META[category] : null;

  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide transition-colors';
  
  const sizeStyles = {
    xs: 'text-[11px] px-2.5 py-0.5 gap-1',
    sm: 'text-xs px-3 py-1 gap-1.5',
    md: 'text-sm px-3.5 py-1.5 gap-2',
  };

  if (meta) {
    return (
      <span
        className={cn(
          baseStyles,
          sizeStyles[size],
          meta.bg,
          meta.color,
          'border',
          meta.border,
          className
        )}
      >
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', meta.dot)} />
        {children || meta.label}
      </span>
    );
  }

  const variants = {
    default: 'bg-stone-100 text-stone-700 border border-stone-200/60',
    stone: 'bg-stone-200/70 text-stone-800',
    dark: 'bg-stone-900 text-cream-50',
    outline: 'border border-stone-300 text-stone-600',
  };

  return (
    <span className={cn(baseStyles, sizeStyles[size], variants[variant], className)}>
      {children}
    </span>
  );
}
