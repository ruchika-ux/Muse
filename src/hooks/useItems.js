import { useState } from 'react';
import { SEED_ITEMS } from '../data/seedData';
import { storageService } from '../services/storageService';

/**
 * useItems.js
 * 
 * Custom hook to provide items and CRUD operations to pages and components.
 * 
 * ============================================================================
 * TODO (For you to implement):
 * 1. Initialize items state:
 *    const [items, setItems] = useState(() => {
 *      return storageService.getItems() || SEED_ITEMS;
 *    });
 * 
 * 2. Implement addItem:
 *    const addItem = (newItem) => {
 *      const itemWithId = { ...newItem, id: newItem.id || Date.now().toString() };
 *      const updated = [itemWithId, ...items];
 *      setItems(updated);
 *      storageService.saveItems(updated);
 *    };
 * 
 * 3. Implement updateItem:
 *    const updateItem = (id, updatedFields) => {
 *      const updated = items.map(item => item.id === id ? { ...item, ...updatedFields } : item);
 *      setItems(updated);
 *      storageService.saveItems(updated);
 *    };
 * 
 * 4. Implement deleteItem:
 *    const deleteItem = (id) => {
 *      const updated = items.filter(item => item.id !== id);
 *      setItems(updated);
 *      storageService.saveItems(updated);
 *    };
 * 
 * 5. Implement getItem:
 *    const getItem = (id) => items.find(item => item.id === id);
 * ============================================================================
 */
export function useItems() {
  // Current static fallback to seed data
  const items = SEED_ITEMS;

  // Placeholder functions (to be replaced with your state handlers)
  const addItem = (newItem) => {
    console.log('TODO: Implement addItem', newItem);
  };

  const updateItem = (id, updatedFields) => {
    console.log('TODO: Implement updateItem', id, updatedFields);
  };

  const deleteItem = (id) => {
    console.log('TODO: Implement deleteItem', id);
  };

  const getItem = (id) => {
    return items.find((item) => item.id === id);
  };

  return {
    items,
    getItem,
    addItem,
    updateItem,
    deleteItem,
  };
}
