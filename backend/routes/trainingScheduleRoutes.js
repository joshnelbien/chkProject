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
    } = req.body;


    const newSchedule = await TrainingSchedule.create({
      title,
      startTime,
      workoutDetails,
      endTime,
      location,
      coach,
      focusAreas,
      date,
      teamId: teamId, 
      teamSchedule: teamId,
    });

    return res.status(201).json({ message: "Success", schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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
  const { id, status } = req.body;

  try {
    const event = await TrainingSchedule.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    let updateData = { status };

    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // HH:MM:SS

    if (status === "Start") {
      updateData.start = formattedTime;
    } else if (status === "End" || status === "Done") {
      updateData.end = formattedTime;

      if (event.start) {
        const [startH, startM, startS] = event.start.split(":").map(Number);
        const [endH, endM, endS] = formattedTime.split(":").map(Number);

        const startDate = new Date();
        startDate.setHours(startH, startM, startS);

        const endDate = new Date();
        endDate.setHours(endH, endM, endS);

        const diffMs = endDate - startDate; // difference in ms
        const diffHrs = Math.floor(diffMs / 1000 / 60 / 60);
        const diffMins = Math.floor((diffMs / 1000 / 60) % 60);
        const diffSecs = Math.floor((diffMs / 1000) % 60);

        updateData.duration = `${diffHrs.toString().padStart(2, "0")}:${diffMins
          .toString()
          .padStart(2, "0")}:${diffSecs.toString().padStart(2, "0")}`;
      }

      updateData.status = "Done"; // mark done
    }

    await event.update(updateData);

    res.status(200).json({ message: "Status updated", updated: event });
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
