const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Manager = require('../models/manager');

const router = express.Router();


// ================= REGISTER =================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check existing user
    const existingUser = await Manager.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const manager = await Manager.create({
      name,
      email,
      password: hashPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      id: manager._id,
      name: manager.name
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ================= LOGIN =================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" });
    }

    // find user
    const manager = await Manager.findOne({ email });

    if (!manager) {
      return res.status(400).json({ error: "Manager not found" });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, manager.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      { id: manager._id, role: "manager" },
      "taskweave_secret",
      { expiresIn: "1d" }
    );

    // send response
    res.json({
      token,
      id: manager._id,
      name: manager.name
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;