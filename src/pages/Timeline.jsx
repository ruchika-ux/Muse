import React from 'react';
import { Calendar } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/common/Badge';
import { useItems } from '../hooks/useItems';
import { Link } from 'react-router-dom';

export function Timeline() {
  const { items } = useItems();

  // =========================================================================
  // TODO (For you to implement):
  // 1. Sort items by date chronologically or reverse chronologically
  // 2. Group items by Year or Season (e.g. 2025, 2026, 2027)
  // 3. Optional: Filter only Milestones & Memories for the timeline
  // =========================================================================

  return (
    <PageContainer maxWidth="max-w-4xl">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
          Timeline
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 mt-1">
          The Journey So Far
        </h1>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
          A simple timeline of your memories, milestones, and what's coming next.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-stone-200/80 ml-4 sm:ml-32 space-y-10 py-4">
        {items.map((item) => (
          <div key={item.id} className="relative pl-6 sm:pl-8 group">
            
            {/* Timeline Node Dot */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#FAF7F2] border-2 border-stone-400 group-hover:border-stone-800 transition-colors flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-500 group-hover:bg-stone-900 transition-colors" />
            </div>

            {/* Date label on Desktop (positioned to the left of the axis) */}
            <div className="hidden sm:block absolute -left-36 top-1 text-right w-28 text-xs font-semibold text-stone-600">
              {item.date}
            </div>

            {/* Timeline Card */}
            <Link
              to={`/item/${item.id}`}
              className="block p-5 sm:p-6 bg-white rounded-2xl border border-stone-200/70 shadow-soft hover:shadow-soft-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge category={item.category} size="xs" />
                <span className="sm:hidden text-xs text-stone-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>

              {item.tags && item.tags.length > 0 && (
                <div className="mt-4 flex items-center gap-1.5 text-xs text-stone-600">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-stone-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
