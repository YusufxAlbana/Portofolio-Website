const express = require('express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const DATA_DIR = path.join(__dirname, '..', 'data');

// Helper: read JSON file
function readData(type) {
  const filePath = path.join(DATA_DIR, `${type}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

// Helper: write JSON file
function writeData(type, data) {
  const filePath = path.join(DATA_DIR, `${type}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Valid data types
const VALID_TYPES = ['projects', 'blog', 'skills', 'profile'];

// ─── GET /api/data/:type — PUBLIC (no auth) ───────
router.get('/:type', (req, res) => {
  const { type } = req.params;

  if (!VALID_TYPES.includes(type)) {
    return res.status(400).json({ error: `Invalid type: ${type}` });
  }

  const data = readData(type);
  if (data === null) {
    return res.status(404).json({ error: `Data not found: ${type}` });
  }

  res.json(data);
});

// ─── POST /api/data/:type — ADMIN (add item) ─────
router.post('/:type', authMiddleware, (req, res) => {
  const { type } = req.params;

  if (!VALID_TYPES.includes(type)) {
    return res.status(400).json({ error: `Invalid type: ${type}` });
  }

  // Profile is an object, not an array
  if (type === 'profile') {
    writeData(type, req.body);
    return res.json({ message: 'Profile updated', data: req.body });
  }

  // Skills is a special structure
  if (type === 'skills') {
    writeData(type, req.body);
    return res.json({ message: 'Skills updated', data: req.body });
  }

  // Projects and blog are arrays
  const data = readData(type);
  if (!Array.isArray(data)) {
    return res.status(500).json({ error: 'Data format error' });
  }

  const newItem = {
    id: `${type.slice(0, -1)}-${Date.now()}`,
    ...req.body,
    time: Date.now(), // Always set time to current timestamp
  };

  // Remove stats if they were sent (just in case)
  delete newItem.stats;

  data.push(newItem);
  writeData(type, data);
  res.status(201).json({ message: 'Item added', data: newItem });
});

// ─── PUT /api/data/:type/:id — ADMIN (edit item) ──
router.put('/:type/:id', authMiddleware, (req, res) => {
  const { type, id } = req.params;

  if (!VALID_TYPES.includes(type)) {
    return res.status(400).json({ error: `Invalid type: ${type}` });
  }

  // Profile update
  if (type === 'profile') {
    const profile = readData(type);
    const updated = { ...profile, ...req.body };
    writeData(type, updated);
    return res.json({ message: 'Profile updated', data: updated });
  }

  // Skills update
  if (type === 'skills') {
    writeData(type, req.body);
    return res.json({ message: 'Skills updated', data: req.body });
  }

  // Array types (projects, blog)
  const data = readData(type);
  if (!Array.isArray(data)) {
    return res.status(500).json({ error: 'Data format error' });
  }

  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item not found: ${id}` });
  }

  data[index] = { ...data[index], ...req.body };
  writeData(type, data);
  res.json({ message: 'Item updated', data: data[index] });
});

// ─── DELETE /api/data/:type/:id — ADMIN (delete) ──
router.delete('/:type/:id', authMiddleware, (req, res) => {
  const { type, id } = req.params;

  if (!VALID_TYPES.includes(type)) {
    return res.status(400).json({ error: `Invalid type: ${type}` });
  }

  if (type === 'profile' || type === 'skills') {
    return res.status(400).json({ error: 'Cannot delete profile or skills, use PUT to update' });
  }

  const data = readData(type);
  if (!Array.isArray(data)) {
    return res.status(500).json({ error: 'Data format error' });
  }

  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item not found: ${id}` });
  }

  const deleted = data.splice(index, 1)[0];
  writeData(type, data);
  res.json({ message: 'Item deleted', data: deleted });
});

module.exports = router;
