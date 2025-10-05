const express = require("express");
const router = express.Router();
const Tournament = require("../db/model/tournamentSchedules");

// ✅ Add new tournament
router.post("/tournaments", async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(201).json(tournament);
  } catch (error) {
    console.error("❌ Error creating tournament:", error);
    res.status(500).json({ error: "Failed to create tournament" });
  }
});

// 🟡 (Optional) Fetch all tournaments
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.findAll();
    res.json(tournaments);
  } catch (error) {
    console.error("❌ Error fetching tournaments:", error);
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
});

module.exports = router;
