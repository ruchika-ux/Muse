import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ItemCard } from '../components/items/ItemCard';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { ItemForm } from '../components/items/ItemForm';
import { useItems } from '../hooks/useItems';

export function Explore() {
  const { items } = useItems();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All Items' },
    { id: 'goal', label: 'Goals' },
    { id: 'interest', label: 'Interests' },
    { id: 'memory', label: 'Memories' },
    { id: 'milestone', label: 'Milestones' },
  ];

  // =========================================================================
  // TODO (For you to implement):
  // 1. Create state for selected category filter:
  //    const [activeCategory, setActiveCategory] = useState('all');
  //
  // 2. Create state for search query:
  //    const [searchQuery, setSearchQuery] = useState('');
  //
  // 3. Filter items array based on activeCategory and searchQuery:
  //    const filteredItems = items.filter(item => {
  //      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
  //      const query = searchQuery.toLowerCase().trim();
  //      const matchesSearch = !query || 
  //        item.title.toLowerCase().includes(query) ||
  //        item.summary.toLowerCase().includes(query) ||
  //        (item.location && item.location.toLowerCase().includes(query)) ||
  //        (item.tags && item.tags.some(t => t.toLowerCase().includes(query)));
  //      return matchesCategory && matchesSearch;
  //    });
  //
  // 4. Implement handleCreateItem submit logic:
  //    const handleCreateItem = (formData) => {
  //      addItem({ ...formData, id: Date.now().toString() });
  //      setIsCreateModalOpen(false);
  //    };
  // =========================================================================

  const activeCategory = 'all'; // Placeholder static value

  const handleCreateSubmit = (formData) => {
    // TODO: Connect to addItem(formData) in useItems.js
    console.log('Create item submit:', formData);
    alert('TODO: Implement addItem logic in useItems.js!');
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
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 mt-1">
            Explore Your World
          </h1>
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
                onClick={() => {
                  // TODO: Update activeCategory state here
                  console.log('Selected category filter:', tab.id);
                }}
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
            placeholder="Search 'Japan', 'Guitar', 'Goa'..."
            onChange={(e) => {
              // TODO: Update searchQuery state here
              console.log('Search input changed:', e.target.value);
            }}
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State skeleton */}
      {items.length === 0 && (
        <div className="py-20 text-center text-stone-400">
          <p className="font-serif text-lg text-stone-600">No items found.</p>
          <p className="text-xs mt-1">Try tweaking your search or adding a new memory.</p>
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
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </PageContainer>
  );
}
