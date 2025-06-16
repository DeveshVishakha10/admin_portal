import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Dashboard } from './components/dashboard/Dashboard';
import { About } from './components/about/About';
import { Contact } from './components/contact/Contact';
import { Pagenotfound } from './components/pagenotfound/Pagenotfound'
import { Contactlist } from './components/contactlist/Contactlist'
import { Edit } from './components/edit/Edit';
import { Admin } from './components/admin/Admin';






function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Admin />} />
        <Route path="contactlist" element={<Contactlist />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
