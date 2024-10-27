import express from "express";
import Clothing from "../models/Clothing.js";
import authenticateToken from "../middleware/authMiddleware.js";
import {
  cloudinaryUpload,
  cloudinaryDelete,
} from "../utils/config.cloudinary.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Add Item
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { category, color, season, occasion } = req.body;
      const imageFile = req.file;

      if (!category || !imageFile) {
        return res
          .status(400)
          .json({ error: "Category and image are required" });
      }
      // console.log("userID:", req.user.id);
      // console.log("Console right before cloudinary:", imageFile, req.body);
      const result = await cloudinaryUpload(imageFile.buffer);
      console.log("Cloudinary Response with Tags: ", result.tags);
      // console.log("CLOUDINARY URL", result);
      const newClothing = new Clothing({
        user: req.user.id,
        category,
        color,
        season,
        occasion,
        image: result.secure_url,
        tags: result.tags,
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

// CLOSET PAGE CLOTHES - Search and Fetch
router.get("/clothing", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const searchQuery = req.query.query || ""; // Get the search query

    // Filter items by search query if provided, searching in `category`, `color`, etc.
    const filter = {
      user: userId,
      $or: [
        { category: { $regex: searchQuery, $options: "i" } },
        { color: { $regex: searchQuery, $options: "i" } },
        { season: { $regex: searchQuery, $options: "i" } },
        { occasion: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const clothes = await Clothing.find(filter);
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching clothing items" });
  }
});

// Delete Item
router.delete("/clothing/:id", authenticateToken, async (req, res) => {
  try {
    const itemId = req.params.id;
    const clothingItem = await Clothing.findById(itemId);
    // console.log("Attempting to delete item with ID:", itemId);

    if (!clothingItem) {
      return res.status(404).json({ error: "Clothing item not found" });
    }

    if (clothingItem.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const imagePublicId = clothingItem.image.split("/").pop().split(".")[0];
    // console.log("Image Public ID:", imagePublicId);

    await cloudinaryDelete(imagePublicId)
      .then(() => console.log("Image deleted from Cloudinary"))
      .catch((cloudinaryError) => {
        console.error("Cloudinary delete error:", cloudinaryError);
        return res
          .status(500)
          .json({ error: "Failed to delete image from Cloudinary" });
      });

    await Clothing.findByIdAndDelete(itemId);
    console.log("Clothing item deleted from MongoDB.");

    res.status(200).json({ message: "Clothing item deleted successfully" });
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({ error: "Item NOT deleted" });
  }
});

export default router;
