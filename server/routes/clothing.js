import express from "express";
import Clothing from "../models/Clothing.js";
import authenticateToken from "../middleware/authMiddleware.js";
import {cloudinaryUpload} from "../utils/config.cloudinary.js";
import streamifier from "streamifier";
import upload from "../middleware/multer.js";

const router = express.Router();

// Add Item
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { category, brand, size, color } = req.body;
      const imageFile = req.file;

      if (!category || !imageFile) {
        return res
          .status(400)
          .json({ error: "Category and image are required" });
      }
      // console.log("userID:", req.user.id);
      // console.log("Console right before cloudinary:", imageFile, req.body);
      const result = await cloudinaryUpload(imageFile.buffer);
      // console.log("CLOUDINARY URL", result);
      const newClothing = new Clothing({
        user: req.user.id,
        category,
        brand,
        size,
        color,
        image: result.secure_url,
      });
      // console.log("NEW CLOTHING", newClothing);
      await newClothing.save().then(() => {
        // console.log("clothing item saved to MONGO:", newClothing);
      });
      res.status(201).json(newClothing);
    } catch (error) {
      res.status(500).json({ error: "Error adding clothing item" });
    }
  },
);
// CLOSET PAGE CLOTHES
router.get("/clothing", authenticateToken, async (req, res) => {
  try {
    const clothes = await Clothing.find({ user: req.user.id });
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching clothing items" });
  }
});

// Still need Delete and Update

export default router;
