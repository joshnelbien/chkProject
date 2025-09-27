require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db/sequelize");

const playerAccount = require("./db/model/playerAccountsDb");
const playerAccountRoutes = require("./routes/playerAccountRoutes");
const app = express();
app.use(cors());

app.get("/api/health", (_, res) => res.json({ ok: true }));

// DB setup
(async () => {
  try {
    await sequelize.authenticate();
    await playerAccount.sync({ alter: true });
    console.log("Database ready.");
  } catch (error) {
    console.error("Database setup or hardcoded insertion failed:", error);
  }
})();

app.use("/userAccounts", playerAccountRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
