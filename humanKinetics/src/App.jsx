import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MedalTally from './INSIDEPAGES/DASHBOARD/MEDALTALLY/medalTally';
import OverView from './INSIDEPAGES/DASHBOARD/OVERVIEW/overView';
import TrainProgram from './INSIDEPAGES/DASHBOARD/TRAINPROGRAM/trainProgram';
import Analytics from './INSIDEPAGES/PERFORMANCE/ANALYTICS/analytics';
import Nutrition from './INSIDEPAGES/PERFORMANCE/NUTRITION/nutrition';
import Schedule from './INSIDEPAGES/PERFORMANCE/SCHEDULE/schedule';
import SportEvent from './INSIDEPAGES/SCHOOL/SPORTEVENT/sportEvent';
import Staff from './INSIDEPAGES/SCHOOL/STAFF/staff';
import MedicalRecord from './INSIDEPAGES/TEAM/MEDICALRECORD/medicalRecord';
import Member from './INSIDEPAGES/TEAM/MEMBER/member';
import Login from './LOGIN/login';
import AboutPage from './PAGES/About/AboutPage';
import AthletePage from './PAGES/Athlete/AthletePage';
import CoachesPage from './PAGES/Coaches/CoachesPage';
import ContactPage from './PAGES/Contact/ContactPage';
import EventPage from './PAGES/Events/EventPage';
import HomePage from './PAGES/HomePage/HomePage';
import ProgramPage from './PAGES/Programs/ProgramPage';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/program' element={<ProgramPage />} />
          <Route path='/coaches' element={<CoachesPage />} />
          <Route path='/event' element={<EventPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/athletes' element={<AthletePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/overView' element={<OverView />} />

      
        <Route path="/medal-tally" element={<MedalTally/>} />
        <Route path="/training-program" element={<TrainProgram/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/nutrition" element={<Nutrition/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/member" element={<Member/>} />
        <Route path="/medical-record" element={<MedicalRecord/>} />
        <Route path="/sports-event" element={<SportEvent/>} />
        <Route path="/staffs" element={<Staff/>} />
          
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
