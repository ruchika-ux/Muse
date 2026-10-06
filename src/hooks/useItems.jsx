import React, { createContext, useContext, useState } from 'react';
import { SEED_ITEMS } from '../data/seedData';

// Create a Context for items to ensure a SINGLE source of truth across all pages
const ItemsContext = createContext(null);

/**
 * ItemsProvider Component
 * Wraps the app and provides shared items state and CRUD operations.
 */
export function ItemsProvider({ children }) {
  const [items, setItems] = useState(SEED_ITEMS);

  // 1. CREATE: Add a new item to the collection
  const addItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: newItem.id || Date.now().toString(),
    };
    setItems((prevItems) => [itemWithId, ...prevItems]);
    return itemWithId;
  };

  // 2. UPDATE: Modify an existing item by its ID
  const updateItem = (id, updatedFields) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  };

  // 3. DELETE: Remove an item from the collection by its ID
  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 4. READ: Retrieve a single item by its ID
  const getItem = (id) => {
    return items.find((item) => item.id === id);
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        getItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

/**
 * Custom hook to easily consume the shared items state and CRUD operations
 */
export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}
