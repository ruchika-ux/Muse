import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind classes cleanly with clsx and twMerge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Helper to format dates or relative timestamps
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  return dateString;
}

/**
 * Helper to truncate long text
 */
export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}
