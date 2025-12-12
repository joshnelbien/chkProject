const express = require("express");
const router = express.Router();
const PerformanceHistory = require("../db/model/performanceDB");

router.get("/analytics/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const records = await PerformanceHistory.findAll({
      where: { playerId: id },
      order: [["createdAt", "ASC"]],
    });

    if (!records.length) {
      return res.json({
        attendanceRate: 0,
        performanceScore: 0,
        improvementRate: 0,
        programCompletion: 0,
        topPerforming: [],
        areasToImprove: [],
      });
    }

    // Extract performance metrics
    const fields = [
      "strength",
      "speed",
      "agility",
      "endurance",
      "accuracy",
      "tactics",
      "strategy",
      "physicalFitness",
      "teamCoordination",
    ];

    // Average score
    const latest = records[records.length - 1];
    const oldest = records[0];

    const avgLatest =
      fields.reduce((sum, key) => sum + Number(latest[key]), 0) /
      fields.length;

    const avgOldest =
      fields.reduce((sum, key) => sum + Number(oldest[key]), 0) /
      fields.length;

    // ⭐ Improvement Formula
    const improvementRate = Math.max(0, ((avgLatest - avgOldest) / avgOldest) * 100);

    // ⭐ Top & Worst Areas
    const areaScores = fields.map((key) => ({
      area: key,
      value: Number(latest[key]),
    }));

    const topPerforming = [...areaScores]
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);

    const areasToImprove = [...areaScores]
      .sort((a, b) => a.value - b.value)
      .slice(0, 3);

    res.json({
      attendanceRate: 100, // add attendance tracking later
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
