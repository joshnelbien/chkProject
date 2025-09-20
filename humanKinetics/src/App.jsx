import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './PAGES/About/AboutPage';
import AthletePage from './PAGES/Athlete/AthletePage';
import CoachesPage from './PAGES/Coaches/CoachesPage';
import ContactPage from './PAGES/Contact/ContactPage';
import EventPage from './PAGES/Events/EventPage';
import HomePage from './PAGES/HomePage/HomePage';
import ProgramPage from './PAGES/Programs/ProgramPage';
import 'leaflet/dist/leaflet.css';

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

          
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
