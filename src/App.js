import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import HomePage from './HomePage';
import Navbar from './components/Navbar';
import UniversityManager from './sayfalar/UniversityManager';
import DepartmentManager from './sayfalar/DepartmentManager';


function App() {
  return (
    <Router>
      <Navbar />  
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/university" element={<UniversityManager />} />
          <Route path="/department" element={<DepartmentManager />} />
        </Routes>

    </Router>
  );
}

export default App;
