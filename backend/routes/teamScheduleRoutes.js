const express = require("express");
const router = express.Router();
const TeamSchedule = require("../db/model/teamScheduleDB");

// ✅ POST route (add this in your routes/teamSchedule.js)
router.post("/addSchedule", async (req, res) => {
  console.log("📥 Incoming team schedule data:", req.body);

  const { teamName, matchDate, opponent, location, time, result } = req.body;

  if (!teamName || !matchDate || !opponent || !location || !time || !result) {
    console.log("⚠️ Missing required fields.");
    return res
      .status(400)
      .json({ message: "All required fields must be filled." });
  }

  try {
    const newSchedule = await TeamSchedule.create({
      teamName,
      matchDate,
      opponent,
      location,
      time,
      result,
    });

    console.log("🟢 [DB INSERT SUCCESS]:", newSchedule.toJSON());
    return res.status(201).json({
      message: "✅ Team schedule added successfully!",
      schedule: newSchedule,
    });
  } catch (error) {
    console.error("❌ [DB INSERT ERROR DETAILS]:", error); // 👈 More descriptive
    return res.status(500).json({
      message: "Server error while adding schedule.",
      error: error.message, // 👈 sends back useful info
    });
  }
});

// 🟡 GET All Schedules
router.get("/team-schedule", async (req, res) => {
  try {
    const schedules = await TeamSchedule.findAll({
      attributes: ["id", "teamId", "title", "date", "startTime", "endTime", "location" ,"teamId"]
    });
    res.json(schedules);
  } catch (error) {
    console.error("❌ Error fetching schedules:", error);
    res.status(500).json({ message: "Failed to fetch team schedules." });
  }
});


module.exports = router;
