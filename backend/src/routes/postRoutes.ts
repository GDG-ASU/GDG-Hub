import express, { Request, Response } from "express";
import authMiddleware  from "../auth/authMiddleware";
import Post from "../models/post";

const router = express.Router();

// Create a new post
router.post("/", authMiddleware, async (req: Request, res: Response) => {
    const { title, content } = req.body;
  
    try {
      const newPost = await Post.create({
        title,
        content,
        userId: req.userId, 
      });
      res.status(201).json({ message: "Post created successfully.", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Error creating post.", error });
    }
  });

// Get all posts
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts.", error });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    await Post.update({ title, content }, { where: { id } });
    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id } });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

export default router;
