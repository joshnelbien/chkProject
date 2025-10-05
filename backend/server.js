require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db/sequelize");

const playerAccount = require("./db/model/playerAccountsDb");
const playerAccountRoutes = require("./routes/playerAccountRoutes");

const teamSchedule = require("./db/model/teamScheduleDB");
const teamScheduleRoutes = require("./routes/teamScheduleRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => res.json({ ok: true }));

// DB setup
(async () => {
  try {
    await sequelize.authenticate();
    await playerAccount.sync({ alter: true });
    await teamSchedule.sync({ alter: true });

    // Insert hardcoded data into teamSchedule table
    console.log("Database ready.");
  } catch (error) {
    console.error("Database setup or hardcoded insertion failed:", error);
  }
})();

app.use("/userAccounts", playerAccountRoutes);
app.use("/teamSchedule", teamScheduleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
