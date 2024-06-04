import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

// UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          // set all that are in req.body
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can only update your account");
  }
});

// DELETE

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User nof found");
    }
  } else {
    res.status(401).json("You can only delete your account");
  }
});

// GET

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // omitting and getting other result
    const { password, ...otherInfo } = user._doc;
    res.status(200).json(otherInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
