import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// CREATE post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(201).json({ savePost, msg: "Post created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res
          .status(200)
          .json({ updatedPost, msg: "Post has been updated successfully" });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json({ msg: "You can only update your own posts" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json({ msg: "Post has been deleted successfully" });
      } catch (error) {
        console.log("TOP", error);
        res.status(500).json(error);
      }
    } else {
      res.status(401).json({ msg: "You can only delete your own posts" });
    }
  } catch (error) {
    console.log("BOTTOM", error);
    res.status(500).json(error);
  }
});

// GET a post by username or category

router.get("/", async (req, res) => {
  const username = req.query.user;
  const categoryName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (categoryName) {
      posts = await Post.find({
        categories: {
          $in: [categoryName],
        },
      });
    }
    else{
      posts = await Post.find()
    }
    res.status(200).json({posts, msg: "All posts successfully retrieved"});
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET all posts

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
