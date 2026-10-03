import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Reusable minimal Input component
 */
export function Input({
  label,
  error,
  icon: Icon,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  return (
    <div className={cn('w-full flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label className="text-xs uppercase tracking-wider font-semibold text-stone-500 pl-0.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-stone-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          className={cn(
            'w-full bg-white/80 border border-stone-200/80 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400',
            'transition-colors duration-200 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/50',
            Icon && 'pl-10',
            error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-100',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-500 pl-0.5">{error}</p>}
    </div>
  );
}
