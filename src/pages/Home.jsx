import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Target, Heart, Camera, Trophy } from 'lucide-react';
import { ItemCard } from '../components/items/ItemCard';
import { Button } from '../components/common/Button';
import { BackgroundSlideshow } from '../components/common/BackgroundSlideshow';
import { CATEGORY_META } from '../data/seedData';
import { useItems } from '../hooks/useItems';
import { slideUp, staggerContainer, fadeIn } from '../utils/animationVariants';

export function Home() {
  const { items } = useItems();

  // Highlight items for Home sections
  const goals = items.filter((i) => i.category === 'goal').slice(0, 2);
  const memories = items.filter((i) => i.category === 'memory').slice(0, 2);
  const others = items.filter((i) => i.category === 'interest' || i.category === 'milestone').slice(0, 2);

  const pillars = [
    {
      type: 'goal',
      title: 'Goals',
      icon: Target,
      desc: 'Trips to take, career targets, and things you want to achieve.',
      count: '3 planned',
    },
    {
      type: 'interest',
      title: 'Interests',
      icon: Heart,
      desc: 'Skills to learn, favorite hobbies, and everyday passions.',
      count: '2 active',
    },
    {
      type: 'memory',
      title: 'Memories',
      icon: Camera,
      desc: 'Trips with friends, quiet days, and moments worth remembering.',
      count: '3 saved',
    },
    {
      type: 'milestone',
      title: 'Milestones',
      icon: Trophy,
      desc: 'Firsts, personal achievements, and chapters in your life.',
      count: '2 marked',
    },
  ];

  return (
    <motion.main
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col"
    >
      {/* Immersive Hero Section with Full-Bleed Vivid Background Slideshow */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
        {/* Visible, high-definition background photography */}
        <BackgroundSlideshow intervalDuration={7000} />

        {/* Translucent Frosted Glass Editorial Hero Island */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative z-10 max-w-3xl w-full mx-auto text-center flex flex-col items-center bg-white/80 backdrop-blur-md border border-white/70 shadow-soft-xl rounded-4xl px-6 py-10 sm:px-12 sm:py-14"
        >
          {/* Subtle Pill Tag */}
          <motion.div
            variants={slideUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/5 border border-stone-900/10 text-stone-800 text-xs font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-600" />
            <span>A simple personal space</span>
          </motion.div>

          {/* Editorial Headline */}
          <motion.h1
            variants={slideUp}
            className="font-serif text-5xl sm:text-6xl md:text-7xl text-stone-900 font-normal tracking-tight leading-[1.12]"
          >
            A little world <br />
            <span className="italic font-normal text-stone-700">of you.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={slideUp}
            className="mt-6 text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed max-w-xl font-normal"
          >
            Muse is a quiet place to track your goals, explore your hobbies, 
            save your favorite memories, and celebrate life milestones.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={slideUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link to="/explore">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="shadow-md hover:shadow-lg">
                Enter Your World
              </Button>
            </Link>
            <Link to="/timeline">
              <Button variant="outline" size="lg" className="bg-white/80 hover:bg-white">
                View Timeline
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Page Body Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20 w-full space-y-16 md:space-y-24 pb-20">
        
        {/* The 4 Facets / Pillars */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {pillars.map((pillar) => {
              const meta = CATEGORY_META[pillar.type];
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.type}
                  className="group p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-2xl ${meta.bg} border ${meta.border} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${meta.color}`} />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-stone-900">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                    <span className="font-medium text-stone-500">{pillar.count}</span>
                    <Link to="/explore" className="text-stone-700 hover:underline inline-flex items-center gap-1 font-medium">
                      Explore &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Goals & Dreams */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C85A32] font-semibold">
                Future Horizons
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
                Featured Goals & Dreams
              </h2>
            </div>
            <Link to="/explore" className="text-sm font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5">
              View all goals &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Recent Memories */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#5C6186] font-semibold">
                Captured Days
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
                Recent Memories
              </h2>
            </div>
            <Link to="/explore" className="text-sm font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5">
              View all memories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memories.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Hobbies & Milestones */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#4D7252] font-semibold">
                Craft & Growth
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
                Interests & Milestones
              </h2>
            </div>
            <Link to="/explore" className="text-sm font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5">
              View collection &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Warm Quote Banner */}
        <section className="p-8 md:p-14 rounded-4xl bg-stone-900 text-cream-50 text-center relative overflow-hidden shadow-soft-lg">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-stone-700/20 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <p className="font-serif italic text-xl sm:text-2xl text-cream-200 font-light leading-relaxed">
              "Collect what you love, track where you're going, and remember where you've been."
            </p>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-sans block pt-2">
              — A Little World of You
            </span>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
