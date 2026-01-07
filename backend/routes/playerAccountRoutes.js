// routes/playerAccountRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const { Op, where } = require("sequelize");
const multer = require("multer");
const playerAccounts = require("../db/model/playerAccountsDb");
const PerformanceHistory = require("../db/model/performanceDB");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const fs = require("fs");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Assuming you're using Express + Sequelize
router.put("/update-performance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const player = await playerAccounts.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Save old stats before updating
    const oldStats = {
      strength: player.strength,
      speed: player.speed,
      agility: player.agility,
      endurance: player.endurance,
      accuracy: player.accuracy,
      tactics: player.tactics,
      strategy: player.strategy,
      physicalFitness: player.physicalFitness,
      teamCoordination: player.teamCoordination,
    };

    // 1️⃣ Update the main profile
    await player.update(updates);

    // 2️⃣ Log performance history
    await PerformanceHistory.create({
      playerId: id,
      ...updates, // save new stats
      updatedBy: req.user?.username || "Coach",
    });

    res.json({
      message: "Player performance updated & logged!",
      oldStats,
      newStats: updates,
    });
  } catch (error) {
    console.error("Error updating performance:", error);
    res.status(500).json({ message: "Server error updating performance" });
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
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL, // Verified sender in SendGrid
      subject: "Verify your E-Athleta Account",
      html: `
    <h2>Welcome to E-Athleta, ${firstName}!</h2>
    <p>Please verify your email address to activate your account.</p>
    <a href="${verifyLink}" style="background:#166534;color:white;padding:10px 15px;border-radius:5px;text-decoration:none;">Verify Email</a>
    <p>If the button doesn’t work, click this link:</p>
    <p>${verifyLink}</p>
    <p>This link will expire in 24 hours.</p>
  `,
    };

    await sgMail.send(msg);
    console.log("📧 Email sent successfully!");

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

router.put("/player/archive/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const player = await playerAccounts.findByPk(id);
    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    await player.update({ isArchived: true });

    res.json({
      success: true,
      message: "Player archived successfully",
    });
  } catch (error) {
    console.error("Error archiving player:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.get("/player/superadmin", async (req, res) => {
  try {
    const players = await playerAccounts.findAll({
      where: {
        isArchived: false,
      },
    });

    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ message: "Server error" });
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

router.get("/player/count", async (req, res) => {
  try {
    const count = await playerAccounts.count(); // count all players
    res.json({ totalPlayers: count });
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

router.put("/player-kick/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playerAccounts.findByPk(id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    await player.update({
      teamId: null,
      status: "Pending", // <— STATUS RESET
    });

    return res.json({
      message: "Player removed from team & status set to Pending.",
      player,
    });
  } catch (error) {
    console.error("Error updating player:", error);
    return res.status(500).json({ message: "Server error updating player." });
  }
});

router.put("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playerAccounts.findByPk(id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    await player.update({
      teamId: null,
      status: "Rejected",
    });

    return res.json({
      message: "Player removed from team & status set to Rejected.",
      player,
    });
  } catch (error) {
    console.error("Error updating player:", error);
    return res.status(500).json({ message: "Server error updating player." });
  }
});

router.put(
  "/players-update/:id",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "medicalCertificate", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { sport } = req.body; // <- get sport from form data
      const player = await playerAccounts.findByPk(id);

      if (!player) return res.status(404).json({ message: "Player not found" });

      const updatedData = { ...req.body };

      if (req.files?.profilePicture)
        updatedData.profilePicture = req.files.profilePicture[0].buffer;
      if (req.files?.medicalCertificate)
        updatedData.medicalCertificate = req.files.medicalCertificate[0].buffer;
      if (updatedData.achievements)
        updatedData.achievements = String(updatedData.achievements);

      await player.update(updatedData);

      // Save performance history
      const historyData = {
        playerId: player.id,
        sport: sport || player.sport,
        updatedBy: req.body.updatedBy || "system",
        notes: req.body.notes || "",
        strength: updatedData.strength || "70",
        speed: updatedData.speed || "70",
        // ... all other metrics
        strength: updatedData.strength || "70",
        speed: updatedData.speed || "70",
        agility: updatedData.agility || "70",
        endurance: updatedData.endurance || "70",
        accuracy: updatedData.accuracy || "70",
        tactics: updatedData.tactics || "70",
        strategy: updatedData.strategy || "70",
        physicalFitness: updatedData.physicalFitness || "70",
        teamCoordination: updatedData.teamCoordination || "70",
        // ================= BASKETBALL =================
        basketballSpeed: updatedData.basketballSpeed || "70",
        basketballVerticalJump: updatedData.basketballVerticalJump || "70",
        basketballAgility: updatedData.basketballAgility || "70",
        basketballEndurance: updatedData.basketballEndurance || "70",
        basketballShootingAccuracy:
          updatedData.basketballShootingAccuracy || "70",
        // ================= VOLLEYBALL =================
        volleyballVerticalJump: updatedData.volleyballVerticalJump || "70",
        volleyballReactionTime: updatedData.volleyballReactionTime || "70",
        volleyballUpperBodyPower: updatedData.volleyballUpperBodyPower || "70",
        volleyballAgility: updatedData.volleyballAgility || "70",
        volleyballServeAccuracy: updatedData.volleyballServeAccuracy || "70",
        // ================= CHEERDANCE =================
        cheerdanceFlexibility: updatedData.cheerdanceFlexibility || "70",
        cheerdanceBalance: updatedData.cheerdanceBalance || "70",
        cheerdanceMuscularEndurance:
          updatedData.cheerdanceMuscularEndurance || "70",
        cheerdanceCoordination: updatedData.cheerdanceCoordination || "70",
        cheerdanceExplosivePower: updatedData.cheerdanceExplosivePower || "70",
        // ================= FUTSAL =================
        futsalSpeed: updatedData.futsalSpeed || "70",
        futsalAgility: updatedData.futsalAgility || "70",
        futsalAerobicEndurance: updatedData.futsalAerobicEndurance || "70",
        futsalBallControl: updatedData.futsalBallControl || "70",
        futsalShootingAccuracy: updatedData.futsalShootingAccuracy || "70",
        // ================= SEPAK TAKRAW =================
        takrawLegPower: updatedData.takrawLegPower || "70",
        takrawFlexibility: updatedData.takrawFlexibility || "70",
        takrawBalance: updatedData.takrawBalance || "70",
        takrawReactionTime: updatedData.takrawReactionTime || "70",
        takrawCoordination: updatedData.takrawCoordination || "70",
        // ================= TABLE TENNIS =================
        tableTennisReactionTime: updatedData.tableTennisReactionTime || "70",
        tableTennisHandEyeCoordination:
          updatedData.tableTennisHandEyeCoordination || "70",
        tableTennisSpeed: updatedData.tableTennisSpeed || "70",
        tableTennisAccuracy: updatedData.tableTennisAccuracy || "70",
        tableTennisEndurance: updatedData.tableTennisEndurance || "70",
        // ================= BADMINTON =================
        badmintonAgility: updatedData.badmintonAgility || "70",
        badmintonSpeed: updatedData.badmintonSpeed || "70",
        badmintonEndurance: updatedData.badmintonEndurance || "70",
        badmintonSmashPower: updatedData.badmintonSmashPower || "70",
        badmintonAccuracy: updatedData.badmintonAccuracy || "70",
        // ================= TAEKWONDO =================
        taekwondoKickingSpeed: updatedData.taekwondoKickingSpeed || "70",
        taekwondoExplosivePower: updatedData.taekwondoExplosivePower || "70",
        taekwondoFlexibility: updatedData.taekwondoFlexibility || "70",
        taekwondoReactionTime: updatedData.taekwondoReactionTime || "70",
        taekwondoBalance: updatedData.taekwondoBalance || "70",
        // ================= ARNIS =================
        arnisHandSpeed: updatedData.arnisHandSpeed || "70",
        arnisReactionTime: updatedData.arnisReactionTime || "70",
        arnisCoordination: updatedData.arnisCoordination || "70",
        arnisEndurance: updatedData.arnisEndurance || "70",
        arnisAccuracy: updatedData.arnisAccuracy || "70",
        // ================= KARATE =================
        karateExplosivePower: updatedData.karateExplosivePower || "70",
        karateSpeed: updatedData.karateSpeed || "70",
        karateBalance: updatedData.karateBalance || "70",
        karateReactionTime: updatedData.karateReactionTime || "70",
        karateTechniquePrecision: updatedData.karateTechniquePrecision || "70",
      };

      await PerformanceHistory.create(historyData);

      res.status(200).json({
        message: "Player updated and performance history recorded successfully",
        player,
      });
    } catch (error) {
      console.error("Error updating player:", error);
      res
        .status(500)
        .json({ message: "Failed to update player", error: error.message });
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

router.get("/medical-certificate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playerAccounts.findByPk(id);

    if (!player || !player.medicalCertificate) {
      return res.status(404).send("Medical certificate not found.");
    }

    // Determine content type
    let contentType = "application/octet-stream"; // default
    if (player.medicalCertificateType) {
      // If you store MIME type in DB
      contentType = player.medicalCertificateType;
    } else {
      // Fallback based on extension
      const ext = path
        .extname(player.medicalCertificateName || "")
        .toLowerCase();
      if (ext === ".pdf") contentType = "application/pdf";
      else contentType = "image/jpeg";
    }

    res.setHeader("Content-Type", contentType);
    res.send(player.medicalCertificate);
  } catch (error) {
    console.error("Error fetching medical certificate:", error);
    res.status(500).send("Server error fetching medical certificate.");
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
    if (player.status === "Pending" || player.status === "Rejected") {
      return res
        .status(402)
        .json({ message: "Please Wait to be Approved By the Coaching Staff" });
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
        status: player.status,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;
