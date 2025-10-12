// routes/playerAccountRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const playerAccounts = require("../db/model/playerAccountsDb");

router.post("/register", async (req, res) => {
  console.log("📥 Incoming body:", req.body);

  // 1. Destructure and Validate Request Body
  const {
    firstName,
    lastName,
    studentNumber,
    email,
    course,
    yearLevel,
    sport,
    password,
    confirmPassword,
    agreedToTerms,
  } = req.body;

  // ✅ Basic Server-Side Validation
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  if (!firstName || !email || !password || !studentNumber || !agreedToTerms) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled." });
  }

  try {
    // 2. Check for Existing User (by email OR student number)
    const existingUser = await playerAccounts.findOne({
      where: {
        [Op.or]: [
          // ✅ FIX: Use Op directly
          { email: email },
          { studentNumber: studentNumber },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({
          message: "An account with this email already exists.",
        });
      } else if (existingUser.studentNumber === studentNumber) {
        return res.status(409).json({
          message: "An account with this student number already exists.",
        });
      }
    }

    // 3. Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create New Account in Database
    const newPlayer = await playerAccounts.create({
      firstName,
      lastName,
      studentNumber,
      email,
      course,
      yearLevel,
      sport,
      password: hashedPassword,
      isVerified: false,
    });

    // 5. Send Success Response (excluding the password)
    const { password: _, ...playerData } = newPlayer.toJSON();
    res.status(201).json({
      message: "Player account created successfully!",
      player: playerData,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

router.get("/players", async (req, res) => {
  try {
    // Fetch data from DB
    const players = await playerAccounts.findAll();
    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// ✅ Login route (for athlete login)
router.post("/player-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find player by email
    const player = await playerAccounts.findOne({ where: { email } });

    if (!player) {
      return res.status(404).json({ message: "No account found with this email." });
    }

    // ✅ Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, player.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // ✅ Login successful
    res.json({
      message: "Login successful!",
      player,
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});


module.exports = router;
