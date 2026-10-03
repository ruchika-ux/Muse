/**
 * storageService.js
 * 
 * Future service layer to manage persistence (e.g. localStorage).
 * 
 * TODO: For you to implement when ready:
 * 1. Initialize storage with seed data if key is empty
 * 2. `getItems()` -> retrieve and parse items from localStorage
 * 3. `saveItems(items)` -> serialize and write items to localStorage
 * 4. `getItemById(id)` -> retrieve a single item
 * 5. `addItem(item)` -> append a new item
 * 6. `updateItem(id, updatedFields)` -> modify an existing item
 * 7. `deleteItem(id)` -> remove an item
 */

const STORAGE_KEY = 'muse_items_v1';

export const storageService = {
  getItems: () => {
    // TODO: Read and JSON.parse from localStorage
    return null;
  },

  saveItems: (items) => {
    // TODO: JSON.stringify and write to localStorage
    console.log('TODO: Implement saveItems', items);
  },

  getItemById: (id) => {
    // TODO: Find item by ID in storage
    console.log('TODO: Implement getItemById', id);
    return null;
  },

  addItem: (item) => {
    // TODO: Add new item to storage
    console.log('TODO: Implement addItem', item);
  },

  deleteItem: (id) => {
    // TODO: Remove item from storage
    console.log('TODO: Implement deleteItem', id);
  },
};
