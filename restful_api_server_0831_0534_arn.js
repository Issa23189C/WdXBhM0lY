// 代码生成时间: 2025-08-31 05:34:35
 * Features:
 * - GET /items: Retrieve all items.
 * - POST /items: Create a new item.
 * - GET /items/{id}: Retrieve an item by id.
 * - PUT /items/{id}: Update an item by id.
 * - DELETE /items/{id}: Delete an item by id.
 */

const { NextApiRequest, NextApiResponse } = require('next');

// Mock data for demonstration purposes
const itemsDatabase = [];

// Utility function to generate a unique id
const generateId = () => Math.random().toString(36).substring(2, 15);

// GET /items - Retrieve all items
const getAllItems = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const items = itemsDatabase;
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching all items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /items - Create a new item
const createItem = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    const newItem = { id: generateId(), name, description };
    itemsDatabase.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /items/{id} - Retrieve an item by id
const getItemById = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    const item = itemsDatabase.find(item => item.id === id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item by id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT /items/{id} - Update an item by id
const updateItem = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    const index = itemsDatabase.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    const updatedItem = { ...itemsDatabase[index], ...req.body };
    itemsDatabase[index] = updatedItem;
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE /items/{id} - Delete an item by id
const deleteItem = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    const index = itemsDatabase.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    itemsDatabase.splice(index, 1);
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export API routes
module.exports = {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem
};
