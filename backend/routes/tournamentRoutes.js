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

router.get("/tournaments", async (req, res) => {
  try {
    const tournaments = await Tournament.findAll();
    res.json(tournaments);
  } catch (error) {
    console.error("❌ Error fetching tournaments:", error);
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
});

router.put("/tournaments/:id", async (req, res) => {
  try {
    const tournament = await TournamentSchedule.findByPk(req.params.id);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    await tournament.update({
      homeScore: req.body.homeScore,
      opponentScore: req.body.opponentScore,
      status: "Done",
      isCompleted: true,
    });

    res.json({ message: "Tournament updated", tournament });
  } catch (error) {
    console.error("❌ Error updating tournament:", error);
    res.status(500).json({ error: "Failed to update tournament" });
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

router.get("/tournaments-Schedules", async (req, res) => {
  try {
    const tournaments = await TournamentSchedule.findAll({});
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
});

router.post("/tournaments/:id/schedule", async (req, res) => {
  try {
    const { id } = req.params;

    const { date, startTime, endTime, opponent, teamId, teamName, sport } =
      req.body;
    // ✅ Fetch tournament to get the correct teamId
    const tournament = await Tournament.findByPk(id);
    if (!tournament)
      return res.status(404).json({ error: "Tournament not found" });

    const schedule = await TournamentSchedule.create({
      tournamentId: id,
      teamSchedule: id,
      teamId: teamId, // <-- use the value sent from frontend
      date,
      startTime,
      endTime,
      opponent,
      teamName,
      sport,
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error("❌ Error saving schedule:", error);
    res.status(500).json({ error: "Failed to save schedule" });
  }
});

module.exports = router;
