import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
function Navbar() {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px 20px' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: 0 }}>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/university">Universite</Link></li>
        <li><Link to="/department">Departman</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
