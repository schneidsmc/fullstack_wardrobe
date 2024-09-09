import express from 'express';
import Clothing from '../models/Clothing.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { category, name, brand, size, color } = req.body;
    
    if (!category || !name) {
      return res.status(400).json({ error: 'Category and name are required' });
    }

    const newClothing = new Clothing({
      user: req.user.id,
      category,
      name,
      brand,
      size,
      color
    });

    await newClothing.save();
    res.status(201).json(newClothing);
  } catch (error) {
    res.status(500).json({ error: 'Error adding clothing item' });
  }
});


router.get('/', authenticateToken, async (req, res) => {
  try {
    const clothes = await Clothing.find({ user: req.user.id });
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching clothing items' });
  }
});

// Still need Delete and Update


export default router;
