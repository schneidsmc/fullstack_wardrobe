import express from "express";
import Clothing from "../models/Clothing.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Generates random outfits
router.get("/randomOutfit", authenticateToken, async (res, req) => {
  try {
    const userId = req.user.id;
    const categories = ["tops", "bottoms", "accessories", "shoes"];
    const randomItems = {};

    for (const category of categories) {
      randomItems[category] = await Clothing.aggregate([
        { $match: { user: userId, category } },
        { $sample: { size: 1 } },
      ]);
    }

    res.status(200).json(randomItems);
  } catch (error) {
    console.error("Can't fetch your fetch outfit", error);
    res.status(500).json({ error: "Fetch outfit is so not fetched" });
  }
});
