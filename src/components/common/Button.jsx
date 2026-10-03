import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Reusable minimal Button component
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-stone-900 text-cream-50 hover:bg-stone-800 shadow-sm hover:shadow active:scale-[0.99] rounded-full',
    secondary: 'bg-stone-100 hover:bg-stone-200/80 text-stone-800 border border-stone-200/60 rounded-full',
    ghost: 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-full',
    outline: 'border border-stone-300 text-stone-700 hover:bg-stone-100/70 hover:border-stone-400 rounded-full',
    soft: 'bg-stone-200/60 text-stone-800 hover:bg-stone-200 rounded-full',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
