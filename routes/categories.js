import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// Create category

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all categories

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json({
      cats,
      msg: "All categories successfully received"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
