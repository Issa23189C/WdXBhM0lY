// 代码生成时间: 2025-08-20 15:05:18
// Import necessary modules for Next.js
const { NextResponse } = require('next/server');

// A simple in-memory storage for the inventory items
// In a real-world application, this would likely be replaced with a database
const inventory = [];

// Helper function to generate a unique ID for each item
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// API endpoint to fetch all inventory items
async function getInventory() {
  try {
    return new NextResponse(JSON.stringify(inventory), { status: 200 });
  } catch (error) {
    return new NextResponse('Error retrieving inventory', { status: 500 });
  }
}

// API endpoint to add a new inventory item
async function addInventoryItem(item) {
  if (!item.name || !item.quantity || !item.description) {
    return new NextResponse('Missing item details', { status: 400 });
  }

  const newItem = { ...item, id: generateId() };
  inventory.push(newItem);
  return new NextResponse(JSON.stringify(newItem), { status: 201 });
}

// API endpoint to update an inventory item
async function updateInventoryItem(itemId, updates) {
  const index = inventory.findIndex(item => item.id === itemId);
  if (index === -1) {
    return new NextResponse('Item not found', { status: 404 });
  }

  if (updates.name) inventory[index].name = updates.name;
  if (updates.quantity) inventory[index].quantity = updates.quantity;
  if (updates.description) inventory[index].description = updates.description;

  return new NextResponse(JSON.stringify(inventory[index]), { status: 200 });
}

// API endpoint to delete an inventory item
async function deleteInventoryItem(itemId) {
  const index = inventory.findIndex(item => item.id === itemId);
  if (index === -1) {
    return new NextResponse('Item not found', { status: 404 });
  }

  inventory.splice(index, 1);
  return new NextResponse('Item deleted', { status: 200 });
}

// Export the API routes
export {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};