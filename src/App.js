import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Navbar from './components/Navbar';
import UniversityManager from './sayfalar/UniversityManager';
import DepartmentManager from './sayfalar/DepartmentManager';
import CourseManager from './sayfalar/CourseManager';
import ProfessorAssignment from './sayfalar/ProfessorAsignment';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Navbar />  
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/university" element={<UniversityManager />} />
          <Route path="/department" element={<DepartmentManager />} />
          <Route path="/course" element={<CourseManager />} />
          <Route path="/prof" element={<ProfessorAssignment />} />
        </Routes>

    </Router>
  );
}

export default App;
