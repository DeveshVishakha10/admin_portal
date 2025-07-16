import 'react-big-calendar/lib/css/react-big-calendar.css'; // ✅ First
import 'bootstrap/dist/css/bootstrap.min.css';              // ✅ Then Bootstrap
import './index.css';                                        // ✅ Your overrides
import './App.css';                                          // ✅ Component styles last
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { About } from './components/about/About';
import { Contact } from './components/contact/Contact';
import { Pagenotfound } from './components/pagenotfound/Pagenotfound';
import { Contactlist } from './components/contactlist/Contactlist';
import { DateProvider } from './components/context/DateContext';
import { Login } from './components/login/Login';
import { Availability } from './components/room_availability/Availability';
import { Allotment } from './components/admin_room_allotment/Allotment';
import { Homepage } from './components/homepage/Homepage';



function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login';

  return (
    <DateProvider>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactlist" element={<Contactlist />} />
        <Route path="/admin_room_allotment" element={<Allotment />} />
        <Route path="/room_availability" element={<Availability />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>

      {!hideLayout && <Footer />}
    </DateProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
