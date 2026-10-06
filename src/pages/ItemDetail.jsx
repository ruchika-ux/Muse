import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Tag, Edit3, Trash2, AlertTriangle } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { ItemForm } from '../components/items/ItemForm';
import { useItems } from '../hooks/useItems';

export function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, updateItem, deleteItem } = useItems();

  // State for modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Find item from shared items state by URL parameter
  const item = items.find((i) => i.id === id);

  // Handle Edit submission
  const handleUpdate = (updatedData) => {
    if (item) {
      updateItem(item.id, updatedData);
      setIsEditModalOpen(false);
    }
  };

  // Handle Delete submission
  const handleDelete = () => {
    if (item) {
      deleteItem(item.id);
      setIsDeleteModalOpen(false);
      navigate('/explore');
    }
  };

  if (!item) {
    return (
      <PageContainer>
        <div className="py-20 text-center">
          <h2 className="font-serif text-2xl text-stone-800">Item Not Found</h2>
          <p className="text-sm text-stone-500 mt-2">
            The item you are looking for does not exist in your world.
          </p>
          <div className="mt-6">
            <Link to="/explore">
              <Button variant="outline" size="sm" icon={ArrowLeft} iconPosition="left">
                Back to Explore
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="max-w-4xl">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Action Controls: Edit & Delete */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Edit3}
            iconPosition="left"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            className="text-stone-500 hover:text-rose-600 hover:bg-rose-50"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content Article */}
      <article className="bg-white rounded-4xl border border-stone-200/70 shadow-soft overflow-hidden">
        {/* Large Cover Photo */}
        {item.coverImage && (
          <div className="w-full h-72 sm:h-96 relative overflow-hidden bg-stone-100">
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="p-8 sm:p-12">
          {/* Category */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <Badge category={item.category} size="md" />
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-stone-900 leading-tight">
            {item.title}
          </h1>

          {/* Metadata Bar */}
          {(item.date || item.location) && (
            <div className="mt-6 pb-6 border-b border-stone-100 flex flex-wrap items-center gap-6 text-sm text-stone-500">
              {item.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span>{item.date}</span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stone-400" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {item.summary && (
            <div className="mt-8">
              <h2 className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2">
                Description
              </h2>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
                {item.summary}
              </p>
            </div>
          )}

          {/* Reflections / Notes (if any) */}
          {item.notes && (
            <div className="mt-8 p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200/60">
              <h2 className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
                Notes & Reflections
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed italic">
                "{item.notes}"
              </p>
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-stone-100">
              <h3 className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium"
                  >
                    <Tag className="w-3 h-3 text-stone-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Edit Item Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Item"
        subtitle="Update the details of your saved item."
      >
        <ItemForm
          mode="edit"
          initialData={item}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Dialog Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Item"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600" />
            <p>
              Are you sure you want to delete <strong className="font-semibold text-rose-900">"{item.title}"</strong> from your world? This action cannot be undone.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200/60 flex items-center justify-end gap-3">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white shadow-none focus-visible:ring-rose-400"
            >
              Delete Item
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
