import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Navbar from './components/Navbar';
import UniversityManager from './sayfalar/UniversityManager';
import DepartmentManager from './sayfalar/DepartmentManager';
import CourseManager from './sayfalar/CourseManager';
import ProfessorAssignment from './sayfalar/ProfessorAsignment';
import CommunityManager from './sayfalar/CommunityManager';
import CommunityAssignment from './sayfalar/CommunityAssignment';
import AnnouncementManager from './sayfalar/AnnouncementManager';
import CompanyManager from './sayfalar/CompanyManager';
import JobManager from './sayfalar/JobManager';
import MealManager from './sayfalar/MealManager';

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
          <Route path="/community" element={<CommunityManager />} />
          <Route path="/communityAssign" element={<CommunityAssignment />} />
          <Route path="/company" element={<CompanyManager />} />
          <Route path="/jobs" element={<JobManager />} />
          <Route path="/meals" element={<MealManager />} />
        </Routes>

    </Router>
  );
}

export default App;
