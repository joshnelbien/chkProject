require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db/sequelize");
const nodemailer = require("nodemailer");


const playerAccount = require("./db/model/playerAccountsDb");
const playerAccountRoutes = require("./routes/playerAccountRoutes");

const teamSchedule = require("./db/model/teamScheduleDB");
const teamScheduleRoutes = require("./routes/teamScheduleRoutes");

const adminAccount = require("./db/model/adminAccountDB");
const adminAccountRoutes = require("./routes/adminAccountRoutes");

const TrainingSchedule = require("./db/model/trainingSchedulesDB");
const trainingScheduleRoutes = require("./routes/trainingScheduleRoutes");

const TournamentSchedule = require("./db/model/tournament");
const Tournament = require("./db/model/tournamentSchedules");
const tournamentRoutes = require("./routes/tournamentRoutes");

const Teams = require("./db/model/teamDB");
const TeamsRoutes = require("./routes/teamRoutes");

const Attendance = require("./db/model/attendanceDB");
const AttendanceRoutes = require("./routes/attendanceRoutes");

const Logs = require("./db/model/logsDB");
const LogsRoutes = require("./routes/logsRoutes");

const MedalTally = require("./db/model/medalTally");
const MedalTallyRoutes = require("./routes/medalTallyRoutes");

const Staffs = require("./db/model/staffsDB");
const staffRoutes = require("./routes/staffRoutes");

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
    await adminAccount.sync({ alter: true });
    await TrainingSchedule.sync({ alter: true });
    await Tournament.sync({ alter: true });
    await TournamentSchedule.sync({ alter: true });
    await Teams.sync({ alter: true });
    await Attendance.sync({ alter: true });
    await Logs.sync({ alter: true });
    await MedalTally.sync({ alter: true });
    await Staffs.sync({ alter: true });
    console.log("Database ready.");
  } catch (error) {
    console.error("Database setup or hardcoded insertion failed:", error);
  }
})();

app.use("/userAccounts", playerAccountRoutes);
app.use("/adminAccounts", adminAccountRoutes);
app.use("/teamSchedule", teamScheduleRoutes);
app.use("/trainingSchedule", trainingScheduleRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/teams", TeamsRoutes);
app.use("/attendance", AttendanceRoutes);
app.use("/logs", LogsRoutes);
app.use("/medalTally", MedalTallyRoutes);
app.use("/staffs", staffRoutes);

app.post("/contact", async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    // Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    await transporter.sendMail({
      from: `"PLSP Website Contact" <${process.env.EMAIL_USER}>`,
      to: "pilaresjoshuel@gmail.com",
      subject: `New Contact Message: ${subject}`,
      html: `
        <h3>Contact Form Details</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error sending email" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
