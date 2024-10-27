import express from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/auth.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// POST user

router.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already created" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = generateToken(newUser);

    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    return res.status(500).json({ error: "Error creating user" });
  }
});

// POST LOGIN user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passMatch = await user.comparePassword(password);
    if (!passMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// GET ALL users
router.get("/info", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// DELETE user by _id from MongoDb
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
