const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const Admin = require("../db/model/adminAccountDB");
require("dotenv").config();

// ✅ Setup Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Admin Registration with Email Verification
router.post("/admin-register", async (req, res) => {
  console.log("📥 Incoming admin registration:", req.body);

  const {
    lastName,
    firstName,
    middleName,
    sports,
    experience,
    education,
    specialization,
    achievements,
    email,
    password,
    confirmPassword,
  } = req.body;

  // Validation
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  if (
    !lastName ||
    !firstName ||
    !sports ||
    !experience ||
    !education ||
    !specialization ||
    !achievements ||
    !email ||
    !password
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled." });
  }

  try {
    // Check for existing admin (by email)
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin account (unverified initially)
    const newAdmin = await Admin.create({
      lastName,
      firstName,
      middleName,
      sports,
      experience,
      education,
      specialization,
      achievements,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // Generate verification token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // ✅ Fix this line in admin register route
    const verifyLink = `${process.env.BACKEND_URL}/adminAccounts/admin-verify-email?token=${token}`;

    // Send verification email
    await transporter.sendMail({
      from: `"E-Athleta Admin Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your E-Athleta Admin Account",
      html: `
        <h2>Welcome to E-Athleta, ${firstName}!</h2>
        <p>Please verify your admin account by clicking below:</p>
        <a href="${verifyLink}" style="background:#166534;color:white;padding:10px 15px;border-radius:5px;text-decoration:none;">Verify Email</a>
        <p>If the button doesn’t work, click this link:</p>
        <p>${verifyLink}</p>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    res.status(201).json({
      message:
        "Admin registration successful! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Admin Registration Error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// ✅ Email Verification Route
router.get("/admin-verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).send("Invalid verification link.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ where: { email: decoded.email } });

    if (!admin) return res.status(404).send("Admin not found.");
    if (admin.isVerified)
      return res.status(400).send("Email already verified.");

    await admin.update({ isVerified: true });

    // Redirect to confirmation page
    res.redirect(`${process.env.FRONTEND_URL}/admin-verified-success`);
  } catch (error) {
    console.error("Admin Verification Error:", error);
    res.status(400).send("Invalid or expired verification token.");
  }
});

// ✅ Admin Login
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    // Check verification
    if (!admin.isVerified) {
      return res.status(403).json({
        message:
          "Your admin account has not been verified yet. Please check your email.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Create token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful!",
      token,
      admin: {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        sports: admin.sports,
        specialization: admin.specialization,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;
