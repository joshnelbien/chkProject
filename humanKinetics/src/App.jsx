import "leaflet/dist/leaflet.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminAthletes from "./ADMINPAGES/ATHLETES/AdminAthletes";
import AdminAttendance from "./ADMINPAGES/ATTENDANCE/AdminAttendance";
import AdminOverView from "./ADMINPAGES/OVERVIEW/OverView";
import AdminPerformance from "./ADMINPAGES/PERFORMANCE/AdminPerformance";
import AdminSchedule from "./ADMINPAGES/SCHEDULE/AdminSchedule";
import AdminTeam from "./ADMINPAGES/TEAMS/AdminTeam";
import AdminTournament from "./ADMINPAGES/TOURNAMENT/AdminTournament";
import AdminTraining from "./ADMINPAGES/TRAINING/AdminTraining";
import AdminVerifyEmail from "./ADMINPAGES/VERIFYPAGE/adminVerifyPage";
import VerifyEmail from "./ADMINPAGES/VERIFYPAGE/verifyPage";
import MedalTally from "./INSIDEPAGES/DASHBOARD/MEDALTALLY/medalTally";
import OverView from "./INSIDEPAGES/DASHBOARD/OVERVIEW/overView";
import TrainProgram from "./INSIDEPAGES/DASHBOARD/TRAINPROGRAM/trainProgram";
import Analytics from "./INSIDEPAGES/PERFORMANCE/ANALYTICS/analytics";
import Nutrition from "./INSIDEPAGES/PERFORMANCE/NUTRITION/nutrition";
import Schedule from "./INSIDEPAGES/PERFORMANCE/SCHEDULE/schedule";
import SportEvent from "./INSIDEPAGES/SCHOOL/SPORTEVENT/sportEvent";
import Staff from "./INSIDEPAGES/SCHOOL/STAFF/staff";
import MedicalRecord from "./INSIDEPAGES/TEAM/MEDICALRECORD/medicalRecord";
import Member from "./INSIDEPAGES/TEAM/MEMBER/member";
import Login from "./LOGIN/login";
import AboutPage from "./PAGES/About/AboutPage";
import AthletePage from "./PAGES/Athlete/AthletePage";
import CoachesPage from "./PAGES/Coaches/CoachesPage";
import ContactPage from "./PAGES/Contact/ContactPage";
import EventPage from "./PAGES/Events/EventPage";
import HomePage from "./PAGES/HomePage/HomePage";
import ProgramPage from "./PAGES/Programs/ProgramPage";
import Register from "./PAGES/Register/Register";
import AdminRegister from "./PAGES/Register/adminRegister";
import "./index.css";
import ManageAccount from "./INSIDEPAGES/MANAGEACCOUNT/ManageAccount";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/coaches" element={<CoachesPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/athletes" element={<AthletePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/overView/:id" element={<OverView />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminRegister" element={<AdminRegister />} />

          {/* ATHLETE PAGES */}
          <Route path="/medal-tally/:id" element={<MedalTally />} />
          <Route path="/training-program/:id" element={<TrainProgram />} />
          <Route path="/analytics/:id" element={<Analytics />} />
          <Route path="/nutrition/:id" element={<Nutrition />} />
          <Route path="/schedule/:id" element={<Schedule />} />
          <Route path="/member/:id" element={<Member />} />
          <Route path="/medicalRecord/:id" element={<MedicalRecord />} />
          <Route path="/sportEvent/:id" element={<SportEvent />} />
          <Route path="/staffs/:id" element={<Staff />} />
          <Route path="/manageAccount/:id" element={<ManageAccount />} />
          <Route path="/verified-success/:id" element={<VerifyEmail />} />
          <Route
            path="/admin-verified-success"
            element={<AdminVerifyEmail />}
          />

          {/* ADMIN PAGES */}
          <Route path="/admin-overview/:id" element={<AdminOverView />} />
          <Route path="/admin-team/:id" element={<AdminTeam />} />
          <Route path="/admin-athletes/:id" element={<AdminAthletes />} />
          <Route path="/admin-performance/:id" element={<AdminPerformance />} />
          <Route path="/admin-schedule/:id" element={<AdminSchedule />} />
          <Route path="/admin-training/:id" element={<AdminTraining />} />
          <Route path="/admin-tournament/:id" element={<AdminTournament />} />
          <Route path="/admin-attendance/:id" element={<AdminAttendance />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
