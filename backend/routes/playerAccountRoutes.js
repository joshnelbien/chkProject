// routes/playerAccountRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const playerAccounts = require("../db/model/playerAccountsDb");
require("dotenv").config();

// ✅ Setup Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Registration with Email Verification
router.post("/register", async (req, res) => {
  console.log("📥 Incoming body:", req.body);

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

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  if (!firstName || !email || !password || !studentNumber || !agreedToTerms) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    const existingUser = await playerAccounts.findOne({
      where: {
        [Op.or]: [{ email }, { studentNumber }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email)
        return res.status(409).json({ message: "An account with this email already exists." });
      if (existingUser.studentNumber === studentNumber)
        return res.status(409).json({ message: "An account with this student number already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create player (not verified yet)
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

    // ✅ Generate Email Verification Token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const verifyLink = `${process.env.FRONTEND_URL}/verified-success?token=${token}`;

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
      message: "Registration successful! Please check your email to verify your account.",
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
    const user = await playerAccounts.findOne({ where: { email: decoded.email } });

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

router.get("/players", async (req, res) => {
  try {
    const players = await playerAccounts.findAll({  });

    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Server error fetching players." });
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



