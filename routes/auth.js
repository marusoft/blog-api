import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashpassword,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post("/login", async(req, res) => {
  try {
    const user = await User.findOne({username: req.body.username})
    !user && res.status(400).json("Wrong Credentials")
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    !validatePassword && res.status(400).json("Wrong Credentials");
    const {password, ...otherInfo} = user._doc
    res.status(200).json(otherInfo);
  } catch (error) {
    
  }
})

export default router;
