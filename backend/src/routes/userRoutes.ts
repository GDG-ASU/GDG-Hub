const express = require("express");
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// User Registration
router.post("/register", async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const user = new User({ email, password, username });
    await user.hashPassword();
    await user.save();
    res.status(201).json({ message: "User registered successfully.", token: jwt.sign({ id: user.id }, JWT_SECRET) });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }
});

// User Login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" }); // Optional: Set an expiration
    return res.status(200).json({ message: "User logged in successfully.", token });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in.", error });
  }
});

export default router;
