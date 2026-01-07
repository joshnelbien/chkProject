// routes/userAccounts.js (or wherever your forgot-password route is)
const express = require("express");
const router = express.Router();
const Admin = require("../db/model/adminAccountDB");
const Player = require("../db/model/playerAccountsDb");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    // 1. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded;

    // 2. Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Update the correct table
    if (role === "admin") {
      await Admin.update({ password: hashedPassword }, { where: { id } });
    } else {
      await Player.update({ password: hashedPassword }, { where: { id } });
    }

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(400).json({ message: "Token is invalid or has expired." });
  }
});


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await Player.findOne({ where: { email } });
    let role = "player";

    if (!user) {
      user = await Admin.findOne({ where: { email } });
      role = "admin";
    }

    if (!user) {
      return res.status(404).json({ message: "No account found with that email address." });
    }

    // Generate a Reset Token (expires in 1 hour)
    const resetToken = jwt.sign(
      { id: user.id, email: user.email, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Link points to your FRONTEND reset password page
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Password Reset Request - E-Athleta",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #166534;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You requested to reset your password. Click the button below to set a new one:</p>
          <div style="margin: 30px 0;">
            <a href="${resetLink}" style="background:#166534; color:white; padding:12px 20px; border-radius:5px; text-decoration:none; font-weight:bold;">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return res.status(200).json({ message: "Reset link sent successfully to your email." });
  } catch (error) {
    console.error("❌ Forgot Password Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;