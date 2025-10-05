const express = require("express");
const router = express.Router();
const TrainingSchedule = require("../db/model/trainingSchedulesDB");

// ✅ POST /api/training — Add a new training schedule
router.post("/training-schedule", async (req, res) => {
  try {
    const { title, startTime, endTime, location, coach, focusAreas } = req.body;

    // 🛑 Basic validation
    if (
      !title ||
      !startTime ||
      !endTime ||
      !location ||
      !coach ||
      !focusAreas
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 📝 Insert into database
    const newSchedule = await TrainingSchedule.create({
      title,
      startTime,
      endTime,
      location,
      coach,
      focusAreas,
    });

    return res.status(201).json({
      message: "✅ Training schedule added successfully.",
      schedule: newSchedule,
    });
  } catch (error) {
    console.error("❌ Error inserting training schedule:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
