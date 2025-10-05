const express = require("express");
const router = express.Router();
const Admin = require("../db/model/adminAccountDB");

// ✅ POST /api/admin/register
router.post("/admin-register", async (req, res) => {
  try {
    const {
      lastName,
      firstName,
      middleName,
      sports,
      experience,
      education,
      specialization,
      achievements,
      password,
    } = req.body;

    // Basic validation
    if (
      !lastName ||
      !firstName ||
      !sports ||
      !experience ||
      !education ||
      !specialization ||
      !achievements ||
      !password
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Create the admin
    const admin = await Admin.create({
      lastName,
      firstName,
      middleName,
      sports,
      experience,
      education,
      specialization,
      achievements,
      password,
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin.id,
        lastName: admin.lastName,
        firstName: admin.firstName,
      },
    });
  } catch (error) {
    console.error("Error during admin registration:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
