import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Plus, X } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ItemCard } from '../components/items/ItemCard';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { ItemForm } from '../components/items/ItemForm';
import { useItems } from '../hooks/useItems';
import { CATEGORY_META } from '../data/seedData';

export function Explore() {
  const { items, addItem } = useItems();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All Items' },
    { id: 'goal', label: 'Goals' },
    { id: 'interest', label: 'Interests' },
    { id: 'memory', label: 'Memories' },
    { id: 'milestone', label: 'Milestones' },
  ];

  // 1. Synchronize active category with the URL query parameter (?category=...)
  const validCategories = ['goal', 'interest', 'memory', 'milestone'];
  const rawCategory = searchParams.get('category');
  const activeCategory = validCategories.includes(rawCategory) ? rawCategory : 'all';

  // 2. Handle category selection and synchronize with URL
  const handleCategoryChange = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryId);
    }
    setSearchParams(newParams);
  };

  // 3. Filter items based on activeCategory AND searchQuery
  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      (item.location && item.location.toLowerCase().includes(query)) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  // 4. Handle Create Item submission
  const handleCreateSubmit = (formData) => {
    addItem(formData);
    setIsCreateModalOpen(false);
  };

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200/60">
        <div>
          <span className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
            Collection
          </span>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900">
              Explore Your World
            </h1>
            {activeCategory !== 'all' && CATEGORY_META[activeCategory] && (
              <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border ${CATEGORY_META[activeCategory].bg} ${CATEGORY_META[activeCategory].color} ${CATEGORY_META[activeCategory].border}`}>
                {CATEGORY_META[activeCategory].pluralLabel}
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  className="hover:opacity-75 transition-opacity"
                  title="Clear category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
          <p className="text-sm text-stone-600 mt-1.5">
            Browse your goals, hobbies, trips, and achievements in one place.
          </p>
        </div>

        {/* Action Button: Opens Create Modal */}
        <div>
          <Button 
            variant="primary" 
            size="md" 
            icon={Plus} 
            iconPosition="left"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Item
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-stone-900 text-cream-50 shadow-sm'
                    : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <Input
            icon={Search}
            value={searchQuery}
            placeholder="Search 'Japan', 'Guitar', 'Goa'..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State when search or category filter yields no results */}
      {filteredItems.length === 0 && (
        <div className="py-20 text-center text-stone-400">
          <p className="font-serif text-lg text-stone-600">No items found.</p>
          <p className="text-xs mt-1">
            {searchQuery
              ? `No items match "${searchQuery}". Try a different keyword.`
              : 'Try selecting a different category or adding a new item.'}
          </p>
          {activeCategory !== 'all' && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCategoryChange('all')}
              >
                View All Items
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Create New Item Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add to Your World"
        subtitle="Capture a new goal, interest, memory, or milestone."
      >
        <ItemForm
          mode="create"
          initialData={{ category: activeCategory !== 'all' ? activeCategory : undefined }}
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </PageContainer>
  );
}
