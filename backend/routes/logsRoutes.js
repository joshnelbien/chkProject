const express = require("express");
const router = express.Router();
const Logs = require("../db/model/logsDB"); // require model at the top

router.post("/logs", async (req, res) => {
    try {
        const { firstName, lastName, email, sport, description, time, date, role } = req.body;

        const newLog = await Logs.create({

            email,

            description,
            time,
            date,
            role
        });

        res.status(201).json(newLog);
    } catch (error) {
        console.error("❌ Error creating log:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/logs", async (req, res) => {
    try {
        const logs = await Logs.findAll();
        res.status(200).json(logs);
    } catch (error) {
        console.error("❌ Error fetching logs:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
