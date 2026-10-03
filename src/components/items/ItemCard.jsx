import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { Badge } from '../common/Badge';
import { cardHover } from '../../utils/animationVariants';
import { CATEGORY_META } from '../../data/seedData';

/**
 * Reusable visual card component for Muse items (Goals, Interests, Memories, Milestones)
 */
export function ItemCard({ item, featured = false }) {
  if (!item) return null;

  const { id, title, category, summary, date, coverImage, tags, location } = item;
  const meta = CATEGORY_META[category] || CATEGORY_META.goal;

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-stone-200/70 shadow-soft hover:shadow-soft-lg transition-all duration-300"
    >
      <Link to={`/item/${id}`} className="flex flex-col h-full">
        {/* Card Image or Aesthetic Tinted Fallback */}
        {coverImage ? (
          <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-stone-100">
            <img
              src={coverImage}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
            
            {/* Category Badge over image */}
            <div className="absolute top-4 left-4">
              <Badge category={category} />
            </div>

            {/* Subtle Arrow Icon */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        ) : (
          <div className={`relative w-full h-24 ${meta.bg} border-b ${meta.border} p-4 flex items-center justify-between`}>
            <Badge category={category} />
            <div className="w-8 h-8 rounded-full bg-white text-stone-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow justify-between bg-white">
          <div>
            <h3 className="font-serif text-xl font-medium text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">
              {title}
            </h3>

            {summary && (
              <p className="mt-2.5 text-sm text-stone-600 leading-relaxed line-clamp-2">
                {summary}
              </p>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
            <div className="flex items-center gap-3">
              {date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-600" />
                  {date}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-600" />
                  {location}
                </span>
              )}
            </div>

            {tags && tags.length > 0 && (
              <span className="text-stone-600 font-medium">
                #{tags[0]}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
