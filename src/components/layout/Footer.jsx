import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-stone-200/60 bg-[#FAF7F2] py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div>
            <span className="font-serif text-xl tracking-tight text-stone-900 block">
              Muse
            </span>
            <p className="text-sm text-stone-500 mt-1">
              A little world of you — Goals, Interests, Memories, and Milestones.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-stone-500">
            <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <Link to="/explore" className="hover:text-stone-900 transition-colors">Explore</Link>
            <Link to="/timeline" className="hover:text-stone-900 transition-colors">Timeline</Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200/40 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2">
          <p>© {new Date().getFullYear()} Muse. Craft your personal universe.</p>
          <p className="italic font-serif">Curated with patience and care.</p>
        </div>
      </div>
    </footer>
  );
}
