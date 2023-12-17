const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Add a user to the database
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userAdded = await User.create({
      name,
      email,
      age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById(id);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
