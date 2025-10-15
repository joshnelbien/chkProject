// routes/teams.js
const express = require("express");
const router = express.Router();
const Teams = require("../db/model/teamDB");
const playerAccounts = require("../db/model/playerAccountsDb");

// ✅ Get all teams by user/admin ID
router.get("/getTeams/:id", async (req, res) => {
  try {
    const teams = await Teams.findAll({ where: { teamId: req.params.id } });
    res.json(teams);
  } catch (err) {
    console.error("❌ Error fetching teams:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/player/:teamId", async (req, res) => {
  try {
    const players = await playerAccounts.findAll({
      where: { teamId: req.params.teamId },
    });
    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Server error fetching players." });
  }
});

// ✅ Create a new team
router.post("/createTeams", async (req, res) => {
  try {
    const { teamId, teamName, sport, coach, description } = req.body;
    const newTeam = await Teams.create({
      teamId,
      teamName,
      sport,
      coach,
      description,
    });
    res.status(201).json(newTeam);
  } catch (err) {
    console.error("❌ Error creating team:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
