const express = require("express");
const router = express.Router();
const PerformanceHistory = require("../db/model/performanceDB");

const sportFields = {
  basketball: [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "basketballSpeed",
    "basketballVerticalJump",
    "basketballAgility",
    "basketballEndurance",
    "basketballShootingAccuracy",
  ],
  volleyball: [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "volleyballVerticalJump",
    "volleyballReactionTime",
    "volleyballUpperBodyPower",
    "volleyballAgility",
    "volleyballServeAccuracy",
  ],
  cheerdance: [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "cheerdanceFlexibility",
    "cheerdanceBalance",
    "cheerdanceMuscularEndurance",
    "cheerdanceCoordination",
    "cheerdanceExplosivePower",
  ],
  futsal: [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "futsalSpeed",
    "futsalAgility",
    "futsalAerobicEndurance",
    "futsalBallControl",
    "futsalShootingAccuracy",
  ],
  "sepak-takraw": [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "takrawLegPower",
    "takrawFlexibility",
    "takrawBalance",
    "takrawReactionTime",
    "takrawCoordination",
  ],
  "table-tennis": [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "tableTennisReactionTime",
    "tableTennisHandEyeCoordination",
    "tableTennisSpeed",
    "tableTennisAccuracy",
    "tableTennisEndurance",
  ],
  badminton: [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "badmintonAgility",
    "badmintonSpeed",
    "badmintonEndurance",
    "badmintonSmashPower",
    "badmintonAccuracy",
  ],
  taekwondo: [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "taekwondoKickingSpeed",
    "taekwondoExplosivePower",
    "taekwondoFlexibility",
    "taekwondoReactionTime",
    "taekwondoBalance",
  ],
  arnis: [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "arnisHandSpeed",
    "arnisReactionTime",
    "arnisCoordination",
    "arnisEndurance",
    "arnisAccuracy",
  ],
  "karate-do": [
    "strength",
    "speed",
    "agility",
    "endurance",
    "accuracy",
    "tactics",
    "strategy",
    "physicalFitness",
    "teamCoordination",
    "karateExplosivePower",
    "karateSpeed",
    "karateBalance",
    "karateReactionTime",
    "karateTechniquePrecision",
  ],
};

router.get("/analytics/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const records = await PerformanceHistory.findAll({
      where: { playerId: id },
      order: [["createdAt", "ASC"]],
    });

    if (!records.length) {
      return res.json({
        sport,
        attendanceRate: 0,
        performanceScore: 0,
        improvementRate: 0,
        programCompletion: 0,
        topPerforming: [],
        areasToImprove: [],
      });
    }

    const sport = records[records.length - 1].sport;
    const fields = sportFields[sport] || []; // only use fields relevant to the sport

    if (!fields.length) {
      return res
        .status(400)
        .json({ message: `No field mapping for sport: ${sport}` });
    }

    const latest = records[records.length - 1];
    const oldest = records[0];

    const avgLatest =
      fields.reduce((sum, key) => sum + Number(latest[key] || 0), 0) /
      fields.length;
    const avgOldest =
      fields.reduce((sum, key) => sum + Number(oldest[key] || 0), 0) /
      fields.length;

    const improvementRate = Math.max(
      0,
      ((avgLatest - avgOldest) / avgOldest) * 100
    );

    const areaScores = fields.map((key) => ({
      area: key,
      value: Number(latest[key] || 0),
    }));

    const topPerforming = [...areaScores]
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
    const areasToImprove = [...areaScores]
      .sort((a, b) => a.value - b.value)
      .slice(0, 3);

    res.json({
      attendanceRate: 100,
      performanceScore: Math.round(avgLatest),
      improvementRate: Math.round(improvementRate),
      programCompletion: 100,
      topPerforming,
      areasToImprove,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const records = await PerformanceHistory.findAll({
      where: { playerId: id },
      order: [["createdAt", "ASC"]],
    });
    res.json(records);
  } catch (error) {
    console.error("Fetch performance history error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
