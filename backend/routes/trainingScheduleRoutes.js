const express = require("express");
const router = express.Router();
const TrainingSchedule = require("../db/model/trainingSchedulesDB");

// ✅ POST /api/training — Add a new training schedule
router.post("/training-schedule", async (req, res) => {
  try {
    const {
      title,
      startTime,
      workoutDetails,
      endTime,
      location,
      coach,
      focusAreas,
      date,
      teamId,
      id, // 👈 selected team id
    } = req.body;

    // Validate required fields
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

    // Save to DB
    const newSchedule = await TrainingSchedule.create({
      title,
      startTime,
      workoutDetails,
      endTime,
      location,
      coach,
      focusAreas,
      date,
      teamId,
      teamSchedule: id, // 👈 give it a proper field name
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

// GET all training schedules
router.get("/training-schedule", async (req, res) => {
  try {
    const schedules = await TrainingSchedule.findAll({
      order: [["date", "ASC"]],
    });

    return res.status(200).json({
      message: "✅ Training schedules fetched successfully.",
      schedules,
    });
  } catch (error) {
    console.error("❌ Error fetching training schedules:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// GET schedules grouped by day (for Weekly Schedule UI)
router.get("/training-schedule/by-day", async (req, res) => {
  try {
    const schedules = await TrainingSchedule.findAll();

    const grouped = {};

    schedules.forEach((item) => {
      const dayName = new Date(item.date).toLocaleString("en-US", {
        weekday: "long",
      });

      if (!grouped[dayName]) grouped[dayName] = [];
      grouped[dayName].push(item);
    });

    return res.status(200).json({
      message: "✅ Weekly schedule fetched.",
      weeklySchedule: grouped,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/training-updates", async (req, res) => {
  const { id, status } = req.body; // id is now the UUID of the schedule

  try {
    // Update using the primary key (UUID)
    const [updatedRows] = await TrainingSchedule.update(
      { status },
      { where: { id } } // only update this schedule
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updatedEvent = await TrainingSchedule.findByPk(id);

    res.status(200).json({ message: "Status updated", updated: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// GET schedules grouped by workout type (Conditioning / Strength / Skills)
router.get("/training-schedule/by-type", async (req, res) => {
  try {
    const schedules = await TrainingSchedule.findAll();

    const grouped = {
      Conditioning: [],
      "Strength Training": [],
      "Skills Development": [],
    };

    schedules.forEach((item) => {
      if (grouped[item.workoutDetails]) {
        grouped[item.workoutDetails].push(item);
      }
    });

    return res.status(200).json({
      message: "✅ Workout details grouped fetched.",
      workoutDetails: grouped,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET schedules for a specific team
router.get("/training-schedule/team/:teamSchedule", async (req, res) => {
  try {
    const { teamSchedule } = req.params;

    const schedules = await TrainingSchedule.findAll({
      where: { teamSchedule },
    });

    return res.status(200).json({
      message: "Team schedules loaded.",
      schedules,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
