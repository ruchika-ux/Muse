import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Compass, Clock, Home as HomeIcon } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Button } from '../common/Button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/timeline', label: 'Timeline', icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF7F2]/80 border-b border-stone-200/50 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="w-9 h-9 rounded-full bg-stone-900 text-cream-100 flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:bg-stone-800 transition-colors">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-tight text-stone-900 font-medium">
              Muse
            </span>
            <span className="text-[10px] tracking-widest uppercase text-stone-600 font-sans -mt-1 font-semibold">
              Personal World
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-200/50 p-1.5 rounded-full border border-stone-200/60 shadow-inner">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={cn(
                  'px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
                )}
              >
                {label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/explore">
            <Button
              variant="primary"
              size="sm"
              icon={Sparkles}
              iconPosition="left"
              className="text-xs px-4 py-2"
            >
              Explore World
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF7F2] px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-stone-900 text-cream-50'
                    : 'text-stone-600 hover:bg-stone-100'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            );
          })}
          <div className="pt-2">
            <Link to="/explore" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full justify-center">
                Explore World
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
