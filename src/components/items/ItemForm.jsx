import React, { useState, useEffect } from 'react';
import { Target, Heart, Camera, Trophy, Image, MapPin, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { CATEGORIES, CATEGORY_META } from '../../data/seedData';

/**
 * Controlled Reusable Form Component for creating and editing Muse items.
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
  // 1. Maintain form state
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    category: initialData.category || CATEGORIES.GOAL,
    summary: initialData.summary || '',
    date: initialData.date || '',
    location: initialData.location || '',
    tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || ''),
    coverImage: initialData.coverImage || '',
  });

  // 2. Form validation error state
  const [errors, setErrors] = useState({});

  // Synchronize state if initialData changes
  useEffect(() => {
    setFormData({
      title: initialData.title || '',
      category: initialData.category || CATEGORIES.GOAL,
      summary: initialData.summary || '',
      date: initialData.date || '',
      location: initialData.location || '',
      tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || ''),
      coverImage: initialData.coverImage || '',
    });
    setErrors({});
  }, [initialData]);

  // Update field on user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Update selected category
  const handleCategorySelect = (categoryValue) => {
    setFormData((prev) => ({ ...prev, category: categoryValue }));
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: '' }));
    }
  };

  // Submit and validate
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Title, Category, and Summary are required
    const validationErrors = {};
    if (!formData.title.trim()) {
      validationErrors.title = 'Title is required';
    }
    if (!formData.category) {
      validationErrors.category = 'Category is required';
    }
    if (!formData.summary.trim()) {
      validationErrors.summary = 'Description is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Convert comma-separated string tags to array: "travel, beach" -> ["travel", "beach"]
    const formattedTags = typeof formData.tags === 'string'
      ? formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : (formData.tags || []);

    const submittedData = {
      ...formData,
      title: formData.title.trim(),
      summary: formData.summary.trim(),
      date: formData.date.trim(),
      location: formData.location.trim(),
      coverImage: formData.coverImage.trim(),
      tags: formattedTags,
    };

    onSubmit?.(submittedData);
  };

  const categoryOptions = [
    { value: CATEGORIES.GOAL, label: 'Goal', icon: Target },
    { value: CATEGORIES.INTEREST, label: 'Interest', icon: Heart },
    { value: CATEGORIES.MEMORY, label: 'Memory', icon: Camera },
    { value: CATEGORIES.MILESTONE, label: 'Milestone', icon: Trophy },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Selector Pills */}
      <div>
        <label className="text-xs uppercase tracking-wider font-semibold text-stone-500 pl-0.5 block mb-2">
          Category <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {categoryOptions.map(({ value, label, icon: Icon }) => {
            const isSelected = formData.category === value;
            const meta = CATEGORY_META[value];
            return (
              <button
                type="button"
                key={value}
                onClick={() => handleCategorySelect(value)}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-medium transition-all ${
                  isSelected
                    ? `${meta.bg} ${meta.color} ${meta.border} shadow-sm ring-2 ring-stone-300`
                    : 'bg-white text-stone-600 border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
        {errors.category && (
          <p className="text-xs text-rose-500 mt-1 pl-0.5">{errors.category}</p>
        )}
      </div>

      {/* Title Field */}
      <Input
        label="Title *"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="e.g. Visit Japan, Learn Guitar, New Year in Goa..."
      />

      {/* Description / Summary */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider font-semibold text-stone-500 pl-0.5">
          Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          name="summary"
          rows={3}
          value={formData.summary}
          onChange={handleChange}
          placeholder="A short, one or two sentence description..."
          className={`w-full bg-white/80 border rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 transition-colors duration-200 focus:outline-none focus:ring-2 resize-none ${
            errors.summary
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100'
              : 'border-stone-200/80 focus:border-stone-400 focus:ring-stone-200/50'
          }`}
        />
        {errors.summary && (
          <p className="text-xs text-rose-500 pl-0.5">{errors.summary}</p>
        )}
      </div>

      {/* Date & Location Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Date / Timing"
          name="date"
          icon={Calendar}
          value={formData.date}
          onChange={handleChange}
          placeholder="e.g. Autumn 2027, Jan 1, 2026"
        />
        <Input
          label="Location (Optional)"
          name="location"
          icon={MapPin}
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Goa, Tokyo, Manali"
        />
      </div>

      {/* Tags & Cover Image URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Tags (Comma separated)"
          name="tags"
          icon={Tag}
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. Travel, Friends, Coding"
        />
        <Input
          label="Cover Image URL"
          name="coverImage"
          icon={Image}
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      {/* Image Preview if URL provided */}
      {formData.coverImage && (
        <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
          <img
            src={formData.coverImage}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-stone-900/60 text-white text-[11px]">
            Image Preview
          </div>
        </div>
      )}

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
