import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
function Navbar() {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px 20px' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: 0 }}>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/university">Universiteler</Link></li>
        <li><Link to="/department">Departmanlar</Link></li>
        <li><Link to="/course">Dersler</Link></li>
        <li><Link to="/prof">Hoca Atama</Link></li>
        <li><Link to="/community">Topluluklar</Link></li>
        <li><Link to="/communityAssign">Topluluk Görevlisi</Link></li>
        <li><Link to="/announcement">Duyurular</Link></li>
        <li><Link to="/company">Şirketler</Link></li>
        <li><Link to="/jobs">İşler</Link></li>
        <li><Link to="/meals">Yemekhane</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;