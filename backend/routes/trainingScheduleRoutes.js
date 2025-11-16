const express = require("express");
const router = express.Router();
const TrainingSchedule = require("../db/model/trainingSchedulesDB");

// ✅ POST /api/training — Add a new training schedule
router.post("/training-schedule", async (req, res) => {
  try {
    const {
      title,
      startTime,
      endTime,
      location,
      coach,
      focusAreas,
      date,
      teamId,
      id, // 👈 selected team id
    } = req.body;

    // Validate required fields
    if (!title || !startTime || !endTime || !location || !coach || !focusAreas) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save to DB
    const newSchedule = await TrainingSchedule.create({
      title,
      startTime,
      endTime,
      location,
      coach,
      focusAreas,
      date,
      teamId,
       id, // 👈 give it a proper field name
    });

    return res.status(201).json({
      message: "Training schedule added successfully.",
      schedule: newSchedule,
    });
  } catch (error) {
    console.error("Error inserting training schedule:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});


router.get("/training-schedule", async (req, res) => {
  try {
    const schedules = await TrainingSchedule.findAll();
    return res.status(200).json({
      message: "✅ Training schedules fetched successfully.",
      schedules,
    });
  } catch (error) {
    console.error("❌ Error fetching training schedules:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
