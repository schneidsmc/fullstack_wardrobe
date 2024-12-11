import express from "express"
import authenticateToken from "../middleware/authMiddleware.js"
import Outfit from "../models/Outfit.js"

const router = express.Router();

// Create new outfit
// POSTMAN => POST /outfits
// dont forget to update Bearer token
// { "top": "<top_id>", "bottom": "<bottom_id>", "shoes": "<shoes_id>", "accessories": "<accessory_id>"
router.post("/", authenticateToken, async (req, res) => {
    try{
        const { top, bottom, shoes, accessories } = req.body;

        if (!top || !bottom || !shoes) {
        return res.status(400).json({error: "Top, bottom and shoes are required"})
    }
    const newOutfit = new Outfit ({
        user: req.user.id,
        top,
        bottom,
        shoes,
        accessories
    });
    await newOutfit.save();
    res.status(201).json(newOutfit);
    } catch (error) {
        console.error("Error creating outfit:", error);
        res.status(500).json({error: "Error creating outfit"})
    }
});


// Get all outfits for the LOGGED IN user
// dont forget to update Bearer token
// POSTMAN GET /outfits
router.get("/outfits", authenticateToken, async (req, res) => {
    try{
        const userId = req.user.id;
        const outfits = await Outfit.find({user: userId}).populate("top bottom shoes accessories")
        res.json(outfits);
    } catch (error) {
        console.error("error fetching ALL outfits for user:", error);
        res.status(500).json({error: "error fetching ALL outfits for user"})
    }
})


// View single outfit by ID
// dont forget to update Bearer token
// POSTMAN GET /outfits/:id
router.get("/:id", authenticateToken, async (req, res) => {
    try{
    const outfitId = req.params.id;
    const outfit = await Outfit.findById(outfitId).populate("top bottom shoes accessories");

    if (!outfit) {
        return res.status(404).json({error: "outfit not found"});
    }
    if (outfit.user.toString() !== req.user.id) {
        return res.status(401).json({error: "Unauthorized! Not logged in or no user found."})
    }

    res.json(outfit)

    }catch (error) {
        console.error("Error fetching outfit by ID:", error);
        res.status(500).json({error: "error fetching outfit by ID"});
    }
})



// Delete outfit
// dont forget to update Bearer token
// POSTMAN DELETE /outfits/:id
router.delete("/:id", authenticateToken, async (req, res) => {
    try{
    const outfitId = req.params.id;
    const outfit = await Outfit.findById(outfitId);

    if (!outfitId) {
        return res.status(404).json({error: "No outfit with this id"})
    }

    if (outfit.user.toString() !== req.user.id) {
        return res.status(401).json({error: "Unauthorized! No user found or not logged in"})
    }

    await Outfit.findByIdAndDelete(outfitId);
    res.status(200).json({message: "outfit deleted!"})

    } catch (error) {
    console.error("error deleting outfit:", error);
    res.status(500).json({error: "error deleting outfit"})
    }
})

export default router;