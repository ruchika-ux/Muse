import React from 'react';
import { Target, Heart, Camera, Trophy, Image, MapPin, Calendar, Tag, FileText } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { CATEGORIES, CATEGORY_META } from '../../data/seedData';

/**
 * Reusable Form Component for creating and editing Muse items.
 * Used identically for both "Create" and "Edit" modes.
 * 
 * Props:
 * - mode: 'create' | 'edit'
 * - initialData: { id, title, category, summary, date, location, tags, coverImage }
 * - onSubmit: (formData) => void
 * - onCancel: () => void
 */
export function ItemForm({
  mode = 'create',
  initialData = {},
  onSubmit,
  onCancel,
}) {
  // =========================================================================
  // TODO (For you to implement):
  // 1. Set up form state using useState with initialData or default values:
  //    const [formData, setFormData] = useState({
  //      title: initialData.title || '',
  //      category: initialData.category || CATEGORIES.GOAL,
  //      summary: initialData.summary || '',
  //      date: initialData.date || '',
  //      location: initialData.location || '',
  //      tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '',
  //      coverImage: initialData.coverImage || '',
  //    });
  //
  // 2. Create an onChange handler to update form fields:
  //    const handleChange = (e) => {
  //      const { name, value } = e.target;
  //      setFormData(prev => ({ ...prev, [name]: value }));
  //    };
  //
  // 3. Create a submit handler:
  //    const handleSubmit = (e) => {
  //      e.preventDefault();
  //      // Transform comma-separated tags into an array
  //      const formattedTags = formData.tags
  //        .split(',')
  //        .map(t => t.trim())
  //        .filter(Boolean);
  //      onSubmit?.({ ...formData, tags: formattedTags });
  //    };
  // =========================================================================

  // Temporary static placeholders for UI rendering
  const categoryOptions = [
    { value: CATEGORIES.GOAL, label: 'Goal', icon: Target },
    { value: CATEGORIES.INTEREST, label: 'Interest', icon: Heart },
    { value: CATEGORIES.MEMORY, label: 'Memory', icon: Camera },
    { value: CATEGORIES.MILESTONE, label: 'Milestone', icon: Trophy },
  ];

  const selectedCategory = initialData.category || CATEGORIES.GOAL;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to your onSubmit handler when state is implemented
    if (onSubmit) {
      onSubmit(initialData);
    } else {
      alert(`TODO: Implement ${mode === 'edit' ? 'Update' : 'Create'} Form Submit Logic!`);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Category Selector Pills */}
      <div>
        <label className="text-xs uppercase tracking-wider font-semibold text-stone-500 pl-0.5 block mb-2">
          Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {categoryOptions.map(({ value, label, icon: Icon }) => {
            const isSelected = selectedCategory === value;
            const meta = CATEGORY_META[value];
            return (
              <button
                type="button"
                key={value}
                onClick={() => {
                  // TODO: Update category in form state
                  console.log('Selected category:', value);
                }}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-medium transition-all ${
                  isSelected
                    ? `${meta.bg} ${meta.color} ${meta.border} shadow-sm ring-1 ring-stone-300`
                    : 'bg-white text-stone-600 border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Title */}
      <Input
        label="Title"
        name="title"
        defaultValue={initialData.title || ''}
        placeholder="e.g. Visit Japan, Learn Guitar, New Year in Goa..."
        required
      />

      {/* Description / Summary */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider font-semibold text-stone-500 pl-0.5">
          Description
        </label>
        <textarea
          name="summary"
          rows={3}
          defaultValue={initialData.summary || ''}
          placeholder="A short, one or two sentence description..."
          className="w-full bg-white/80 border border-stone-200/80 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 transition-colors duration-200 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/50 resize-none"
        />
      </div>

      {/* Date & Location Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Date / Timing"
          name="date"
          icon={Calendar}
          defaultValue={initialData.date || ''}
          placeholder="e.g. Autumn 2027, Jan 1, 2026"
        />
        <Input
          label="Location (Optional)"
          name="location"
          icon={MapPin}
          defaultValue={initialData.location || ''}
          placeholder="e.g. Goa, Tokyo, Manali"
        />
      </div>

      {/* Tags & Cover Image URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Tags (Comma separated)"
          name="tags"
          icon={Tag}
          defaultValue={Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || '')}
          placeholder="e.g. Travel, Friends, Coding"
        />
        <Input
          label="Cover Image URL"
          name="coverImage"
          icon={Image}
          defaultValue={initialData.coverImage || ''}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      {/* Form Action Buttons */}
      <div className="pt-4 border-t border-stone-200/60 flex items-center justify-end gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          size="md"
        >
          {mode === 'edit' ? 'Save Changes' : 'Create Item'}
        </Button>
      </div>
    </form>
  );
}
