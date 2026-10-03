import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Timeline } from './pages/Timeline';
import { ItemDetail } from './pages/ItemDetail';
import { NotFound } from './pages/NotFound';

// Scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-stone-800 font-sans selection:bg-stone-200">
      <ScrollToTop />
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Routed Content */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
