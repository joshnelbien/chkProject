const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const { Op } = require("sequelize");
require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const Admin = require("../db/model/adminAccountDB");
const Players = require("../db/model/playerAccountsDb");

router.get("/counts", async (req, res) => {
  try {
    const [adminCount, playerCount] = await Promise.all([
      // Count Admins where isSuperAdminVerified is true
      Admin.count({
        where: {
          isSuperAdminVerified: true
        }
      }),
      
      // Count Players where status is 'in team'
      Players.count({
        where: {
          status: 'In Team'
        }
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        verifiedAdmins: adminCount,
        playersInTeam: playerCount,
        totalFiltered: adminCount + playerCount
      }
    });
  } catch (error) {
    console.error("Sequelize Filter Error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving filtered account counts",
      error: error.message
    });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
// ✅ Setup Email Transporter

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL, // Verified sender in SendGrid
      subject: "Verify your Admin E-Athleta Account",
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
        "Admin registration successful! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Admin Registration Error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

router.get("/coaches", async (req, res) => {
  try {
    const coaches = await Admin.findAll();

    const formatted = coaches.map((c) => ({
      id: c.id,
      name: `${c.firstName} ${c.middleName ?? ""} ${c.lastName}`,
      sport: c.sports,
      experience: c.experience,
      image: c.profilePicture
        ? `data:image/jpeg;base64,${c.profilePicture.toString("base64")}`
        : "/default.jpg",
      education: c.education.split("|"), // stored as "A|B|C"
      specialization: c.specialization.split("|"),
      achievements: c.achievements.split("|"),
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching coaches:", error);
    res.status(500).json({ error: "Server error fetching coaches." });
  }
});

router.get("/admins", async (req, res) => {
  try {
    const admins = await Admin.findAll({});

    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Server error fetching admins." });
  }
});

router.get("/admins/archieved", async (req, res) => {
  try {
    const admins = await Admin.findAll({
      where: { isArchived: false }
    });

    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Server error fetching admins." });
  }
});



router.get("/coaches-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const coach = await Admin.findByPk(id);

    if (!coach) {
      return res.status(404).json({ error: "coach not found" });
    }

    res.json(coach);
  } catch (error) {
    console.error("Error fetching coach:", error);
    res.status(500).json({ error: "Server error fetching coach." });
  }
});

router.put(
  "/coaches-update/:id",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const coach = await Admin.findByPk(id);
      if (!coach) {
        return res.status(404).json({ message: "coach not found" });
      }

      const updatedData = { ...req.body };
      if (req.file) {
        updatedData.profilePicture = req.file.buffer;
      }
      await coach.update(updatedData);

      res.status(200).json({
        message: "coach updated successfully",
        coach,
      });
    } catch (error) {
      console.error("Error updating coach:", error);
      res.status(500).json({
        message: "Failed to update coach",
        error: error.message,
      });
    }
  }
);

router.put("/verify-superadmin/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if admin is verified first
    if (!admin.isVerified) {
      return res.status(400).json({ success: false, message: "Cannot verify Super Admin: admin is not verified yet." });
    }

    // Update Super Admin Verified field
    admin.isSuperAdminVerified = true;
    await admin.save();

    res.json({ success: true, message: "Super Admin Verified", admin });
  } catch (error) {
    console.error("Error verifying admin:", error);
    res.status(500).json({ error: "Server error while verifying admin." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    await admin.destroy(); // delete the admin

    res.json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ success: false, message: "Server error while deleting admin" });
  }
});

router.patch("/:id/archive", async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    admin.isArchived = true;
    await admin.save();

    res.json({ success: true, message: "Admin archived successfully" });
  } catch (error) {
    console.error("Error archiving admin:", error);
    res.status(500).json({ success: false, message: "Server error while archiving admin" });
  }
});


router.get("/coach-photo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const coach = await Admin.findByPk(id);

    res.setHeader("Content-Type", "image/jpeg");
    res.send(coach.profilePicture);
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    res.status(500).send("Server error fetching profile picture.");
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

    if (admin.isSuperAdminVerified === false) {
      return res.status(402).json({ message: "Please wait for the super admin verifies your account." });
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
