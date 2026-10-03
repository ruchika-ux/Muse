import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Target, Heart, Camera, Trophy } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ItemCard } from '../components/items/ItemCard';
import { Button } from '../components/common/Button';
import { CATEGORY_META } from '../data/seedData';
import { useItems } from '../hooks/useItems';
import { fadeIn, slideUp, staggerContainer } from '../utils/animationVariants';

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
    <PageContainer>
      {/* Hero Section */}
      <motion.section 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="pt-8 pb-16 md:pt-14 md:pb-24 text-center max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Subtle Pill Tag */}
        <motion.div 
          variants={slideUp}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/60 border border-stone-200 text-stone-700 text-xs font-medium tracking-wide mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-stone-500" />
          <span>A simple personal space</span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.h1 
          variants={slideUp}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 font-normal tracking-tight leading-[1.15]"
        >
          A little world <br />
          <span className="italic font-normal text-stone-700">of you.</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          variants={slideUp}
          className="mt-6 text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal"
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
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Enter Your World
            </Button>
          </Link>
          <Link to="/timeline">
            <Button variant="outline" size="lg">
              View Timeline
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* The 4 Facets / Pillars */}
      <section className="py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar) => {
            const meta = CATEGORY_META[pillar.type];
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.type}
                className="group p-6 rounded-3xl bg-white border border-stone-200/70 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-2xl ${meta.bg} flex items-center justify-center mb-4`}>
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
      <section className="mt-16 md:mt-24">
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
      <section className="mt-16 md:mt-24">
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
      <section className="mt-16 md:mt-24">
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

      {/* Quote Banner */}
      <section className="mt-20 md:mt-28 p-8 md:p-14 rounded-4xl bg-stone-900 text-cream-50 text-center relative overflow-hidden">
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
    </PageContainer>
  );
}
