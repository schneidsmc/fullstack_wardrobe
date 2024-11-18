import express from "express";
import userRoutes from "./users.js";
import clothingRoutes from "./clothing.js";
// import randomOutfit from "./random.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/upload", clothingRoutes);
// router.use("/randomOutfit", randomOutfit)

export default router;
