const express = require("express");
const playerAccounts = require("../db/model/playerAccountsDb");
const { sequelize } = require("../db/sequelize");

const app = express();
const PORT = 3000;

const router = express.Router();

app.use(express.json());

app.post("/api/register", async (req, res) => {
  const firstname = "TestRunne5";
  const lastname = "TestAccount2";
  const email = "tasfasf@hardcode.com";
  const password = "HardcodedSecurePassword123";
  console.log(`Attempting to insert hardcoded user: ${email}`);

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPlayer = await playerAccounts.create({
      lastname,
      firstname,
      email,
      password: hashedPassword,
    });

    const responseData = newPlayer.toJSON();
    delete responseData.password;

    res.status(201).json({
      message: "Hardcoded player account inserted successfully.",
      user: responseData,
    });
  } catch (error) {
    console.error("Error during hardcoded registration insertion:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0].path;
      return res.status(409).json({
        error: `Insertion failed: ${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is already in use. Please change the hardcoded value in app.js before testing again.`,
        field: field,
      });
    }

    res.status(500).json({
      error:
        "Internal server error while processing hardcoded insertion. Check your console for Sequelize errors.",
      details: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    "Test registration via POST request to http://localhost:3000/api/register"
  );
});

module.exports = router;
