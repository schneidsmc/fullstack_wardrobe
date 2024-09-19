import express from 'express';
import Clothing from '../models/Clothing.js';
import authenticateToken from '../middleware/authMiddleware.js';
import cloudinary from '../utils/config.cloudinary.js'
import streamifier from 'streamifier';
import upload from '../middleware/multer.js'

const router = express.Router();

const cloudinaryUpload = (buffer) => {
  return new Promise((resolve, reject) =>{
    const stream = cloudinary.uploader.upload_stream(
      {resource_type: 'auto'},
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  })
}

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    console.log('WE ARE HEREEEEEE')
    const { category, name, brand, size, color } = req.body;
    const imageFile = req.file;
    console.log('ImageFile:', req.file)
    console.log('body infor:', req.body)

    if (!category || !name || !imageFile) {
      return res.status(400).json({ error: 'Category, name and image are required' });
    }

    const result = await cloudinaryUpload(imageFile.buffer);
    console.log('Cloudinary: ', result)
    const newClothing = new Clothing({
      user: req.user.id,
      category,
      name,
      brand,
      size,
      color,
      image: result.secure_url
    });

    await newClothing.save();
    res.status(201).json(newClothing);
  } catch (error) {
    console.error('Error:', error)
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
