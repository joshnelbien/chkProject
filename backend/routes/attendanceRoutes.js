// routes/attendance.js
const express = require("express");
const router = express.Router();
const Attendance = require("../db/model/attendanceDB");

// Time In
router.post("/time-in", async (req, res) => {
  try {
    const {
      userId,
      scheduleId,
      type,
      sport,
      description,
      firstName,
      lastName,
      email,
    } = req.body;

    const now = new Date();
    const time = now.toTimeString().slice(0, 5); // HH:mm
    const date = now.toISOString().slice(0, 10); // YYYY-MM-DD

    // Check if the user already timed in today for this schedule
    const existing = await Attendance.findOne({
      where: { userId, scheduleId, date },
    });
    if (existing)
      return res.status(400).json({
        message: "Already timed in for this schedule",
        attendance: existing,
      });

    const attendance = await Attendance.create({
      userId,
      scheduleId,
      type,
      sport,
      description,
      firstName,
      lastName,
      email,
      timeIn: time,
      date,
    });

    res.status(201).json(attendance);
  } catch (err) {
    console.error("Time In error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Time Out
router.post("/time-out", async (req, res) => {
  try {
    const { userId, scheduleId } = req.body;
    const now = new Date();
    const time = now.toTimeString().slice(0, 5); // HH:mm
    const date = now.toISOString().slice(0, 10);

    const attendance = await Attendance.findOne({
      where: { userId, scheduleId, date },
    });

    if (!attendance)
      return res.status(404).json({ message: "Attendance not found" });

    if (attendance.timeOut)
      return res.status(400).json({ message: "Already timed out", attendance });

    if (!attendance.timeIn)
      return res
        .status(400)
        .json({ message: "Cannot time out before timing in" });

    attendance.timeOut = time;
    await attendance.save();

    res.status(200).json(attendance);
  } catch (err) {
    console.error("Time Out error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Optional: fetch attendance for a user schedule
router.get("/user/:userId/schedule/:scheduleId", async (req, res) => {
  try {
    const { userId, scheduleId } = req.params;
    const today = new Date().toISOString().slice(0, 10);

    const attendance = await Attendance.findOne({
      where: { userId, scheduleId, date: today },
    });

    res.status(200).json(attendance || null);
  } catch (err) {
    console.error("Fetch attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
