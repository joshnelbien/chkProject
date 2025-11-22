// routes/playerAccountRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Op, where } = require("sequelize");
const multer = require("multer");
const playerAccounts = require("../db/model/playerAccountsDb");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Setup Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Assuming you're using Express + Sequelize
router.put("/update-performance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // object sent from frontend

    // Find the player
    const player = await playerAccounts.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Update the player
    await player.update(updates);

    return res.json({ message: "Player updated successfully!", player });
  } catch (error) {
    console.error("Error updating performance:", error);
    return res
      .status(500)
      .json({ message: "Server error updating performance" });
  }
});

// ✅ Registration with Email Verification
router.post("/register", async (req, res) => {
  console.log("📥 Incoming body:", req.body);

  const {
    firstName,
    lastName,
    studentNumber,
    bDay,
    email,
    course,
    yearLevel,
    sport,
    password,
    confirmPassword,
    agreedToTerms,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  if (!firstName || !email || !password || !studentNumber || !agreedToTerms) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled." });
  }

  try {
    const existingUser = await playerAccounts.findOne({
      where: {
        [Op.or]: [{ email }, { studentNumber }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email)
        return res
          .status(409)
          .json({ message: "An account with this email already exists." });
      if (existingUser.studentNumber === studentNumber)
        return res.status(409).json({
          message: "An account with this student number already exists.",
        });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create player (not verified yet)
    const newPlayer = await playerAccounts.create({
      firstName,
      lastName,
      studentNumber,
      bDay,
      email,
      course,
      yearLevel,
      sport,
      password: hashedPassword,
      isVerified: false,
    });

    // ✅ Generate Email Verification Token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const verifyLink = `${process.env.BACKEND_URL}/userAccounts/verify-email?token=${token}`;

    // ✅ Send Verification Email
    await transporter.sendMail({
      from: `"E-Athleta Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your E-Athleta Account",
      html: `
        <h2>Welcome to E-Athleta, ${firstName}!</h2>
        <p>Please verify your email address to activate your account.</p>
        <a href="${verifyLink}" style="background:#166534;color:white;padding:10px 15px;border-radius:5px;text-decoration:none;">Verify Email</a>
        <p>If the button doesn’t work, click this link:</p>
        <p>${verifyLink}</p>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    res.status(201).json({
      message:
        "Registration successful! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// ✅ Email Verification Route
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Invalid verification link.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await playerAccounts.findOne({
      where: { email: decoded.email },
    });

    if (!user) return res.status(404).send("User not found.");
    if (user.isVerified) return res.status(400).send("Email already verified.");

    await user.update({ isVerified: true });

    // Redirect to your frontend confirmation page
    res.redirect(`${process.env.FRONTEND_URL}/verified-success`);
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(400).send("Invalid or expired token.");
  }
});

router.delete("/player/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await playerAccounts.destroy({ where: { id } });
    if (deleted) {
      res.json({ success: true, message: "Player deleted successfully." });
    } else {
      res.status(404).json({ success: false, message: "Player not found." });
    }
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

router.get("/players", async (req, res) => {
  try {
    const players = await playerAccounts.findAll({});

    const formatted = players.map((p) => {
      const player = p.toJSON();

      if (player.profilePicture) {
        player.profilePicture = Buffer.from(player.profilePicture).toString(
          "base64"
        );
      }

      return player;
    });

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Server error fetching players." });
  }
});

router.get("/players/:id", async (req, res) => {
  try {
    const players = await playerAccounts.findAll({});

    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Server error fetching players." });
  }
});

router.get("/player", async (req, res) => {
  try {
    const players = await playerAccounts.findAll({});

    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Server error fetching players." });
  }
});



router.get("/players-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playerAccounts.findByPk(id);

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    res.status(500).json({ error: "Server error fetching player." });
  }
});

router.put(
  "/players-update/:id",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const player = await playerAccounts.findByPk(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      // Create a copy of all fields from req.body
      const updatedData = { ...req.body };

      // If image uploaded, attach it
      if (req.file) {
        updatedData.profilePicture = req.file.buffer;
      }

      // Perform update
      await player.update(updatedData);

      res.status(200).json({
        message: "Player updated successfully",
        player,
      });
    } catch (error) {
      console.error("Error updating player:", error);
      res.status(500).json({
        message: "Failed to update player",
        error: error.message,
      });
    }
  }
);

router.get("/player-photo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playerAccounts.findByPk(id);

    res.setHeader("Content-Type", "image/jpeg");
    res.send(player.profilePicture);
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    res.status(500).send("Server error fetching profile picture.");
  }
});

router.post("/player-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Find player by email
    const player = await playerAccounts.findOne({ where: { email } });

    if (!player) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    // 🚫 Check if account is verified
    if (!player.isVerified) {
      return res.status(403).json({
        message:
          "Your account has not been verified yet. Please check your email for the verification link.",
      });
    }

    // ✅ Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, player.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { id: player.id, email: player.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Login successful
    res.json({
      message: "Login successful!",
      token, // optional, include if your frontend uses it
      player: {
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        email: player.email,
        studentNumber: player.studentNumber,
        course: player.course,
        yearLevel: player.yearLevel,
        sport: player.sport,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;
