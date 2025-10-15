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

router.put("/player-addTeam", async (req, res) => {
  try {
    const { playerId, teamId } = req.body;

    // ✅ Validate input
    if (!playerId || !teamId) {
      return res
        .status(400)
        .json({ message: "playerId and teamId are required" });
    }

    // ✅ Check if team exists
    const team = await Teams.findByPk(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // ✅ Find the player
    const player = await playerAccounts.findByPk(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // ✅ Update player's teamId and status
    player.teamId = team.id;
    player.status = "In Team";
    await player.save();

    res.json({
      message: "Player successfully added to the team",
      player,
    });
  } catch (error) {
    console.error("❌ Error adding player to team:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
