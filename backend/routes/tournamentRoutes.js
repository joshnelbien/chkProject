const express = require("express");
const router = express.Router();
const Tournament = require("../db/model/tournamentSchedules");
const TournamentSchedule = require("../db/model/tournament");

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
router.get("/tournaments-activities", async (req, res) => {
  try {
    const tournaments = await Tournament.findAll({
      include: {
        model: TournamentSchedule,
        as: "schedules",
      },
    });
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
});

router.post("/tournaments/:id/schedule", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime, opponent } = req.body;

    // ✅ Fetch tournament to get the correct teamId
    const tournament = await Tournament.findByPk(id);
    if (!tournament)
      return res.status(404).json({ error: "Tournament not found" });

    const schedule = await TournamentSchedule.create({
      tournamentId: id,
      teamId: tournament.teamId, // use tournament's teamId
      date,
      startTime,
      endTime,
      opponent,
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error("❌ Error saving schedule:", error);
    res.status(500).json({ error: "Failed to save schedule" });
  }
});

module.exports = router;
