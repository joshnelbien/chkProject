const express = require("express");
const router = express.Router();
const MedalTally = require("../db/model/medalTally");


router.post("/medalTally", async (req, res) => {
  try {
    const medalTally = await MedalTally.create(req.body);
    res.status(201).json(medalTally);
  } catch (error) {
    res.status(500).json({ error: "Failed to create medal tally" });
  }
});

router.get("/medalTally", async (req, res) => {
  try {
    const medalTallies = await MedalTally.findAll();
    res.status(200).json(medalTallies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medal tallies" });
  }
});

module.exports = router;
