
  import React, { useState } from 'react';

  const universities = [
    {
      id: 1,
      name: 'Üniversite A',
      departments: [
        { 
          id: 1, 
          name: 'Bilgisayar Mühendisliği',
          courses: [
            { id: 1, name: 'Algoritmalar' },
            { id: 2, name: 'Veri Yapıları' }
          ],
          professors: [
            { id: 1, name: 'Prof. Dr. Ahmet Yılmaz' },
            { id: 2, name: 'Doç. Dr. Elif Kaya' }
          ]
        },
        { 
          id: 2, 
          name: 'Elektrik Mühendisliği',
          courses: [
            { id: 3, name: 'Elektronik' },
            { id: 4, name: 'Devre Teorisi' }
          ],
          professors: [
            { id: 3, name: 'Prof. Dr. Mehmet Çetin' },
            { id: 4, name: 'Doç. Dr. Canan Sönmez' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Üniversite B',
      departments: [
        { 
          id: 3, 
          name: 'Makine Mühendisliği',
          courses: [
            { id: 5, name: 'Termodinamik' },
            { id: 6, name: 'Mekanik' }
          ],
          professors: [
            { id: 5, name: 'Prof. Dr. Ali Veli' },
            { id: 6, name: 'Doç. Dr. Derya Deniz' }
          ]
        },
        { 
          id: 4, 
          name: 'İnşaat Mühendisliği',
          courses: [
            { id: 7, name: 'Statik' },
            { id: 8, name: 'Betonarme' }
          ],
          professors: [
            { id: 7, name: 'Prof. Dr. Hasan Kara' },
            { id: 8, name: 'Doç. Dr. Burak Yıldırım' }
          ]
        }
      ]
    }
  ];

function CourseAssignment() {
  const [selectedUniversityId, setSelectedUniversityId] = useState('');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedProfessorId, setSelectedProfessorId] = useState('');
  const [assignments, setAssignments] = useState([]);

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const submitAssignment = () => {
    if (!selectedProfessorId) return;
    const assignment = {
      id: `${selectedUniversityId}-${selectedDepartmentId}-${selectedCourseId}-${selectedProfessorId}`,
      university: universities.find(u => u.id.toString() === selectedUniversityId)?.name,
      department: universities.find(u => u.id.toString() === selectedUniversityId)?.departments.find(d => d.id.toString() === selectedDepartmentId)?.name,
      course: universities.find(u => u.id.toString() === selectedUniversityId)?.departments.find(d => d.id.toString() === selectedDepartmentId)?.courses.find(c => c.id.toString() === selectedCourseId)?.name,
      professor: universities.find(u => u.id.toString() === selectedUniversityId)?.departments.find(d => d.id.toString() === selectedDepartmentId)?.professors.find(p => p.id.toString() === selectedProfessorId)?.name
    };
    setAssignments([...assignments, assignment]);
    setSelectedProfessorId('');
  };

  const handleDelete = (assignmentId) => {
    setAssignments(assignments.filter(a => a.id !== assignmentId));
  };

  const currentUniversity = universities.find(u => u.id.toString() === selectedUniversityId);
  const currentDepartments = currentUniversity ? currentUniversity.departments : [];
  const currentCourses = selectedDepartmentId ? currentDepartments.find(d => d.id.toString() === selectedDepartmentId).courses : [];
  const currentProfessors = selectedDepartmentId ? currentDepartments.find(d => d.id.toString() === selectedDepartmentId).professors : [];

  return (
    <div>
      <select value={selectedUniversityId} onChange={(e) => handleChange(e, setSelectedUniversityId)}>
        <option value="">Üniversite Seçiniz</option>
        {universities.map(uni => (
          <option key={uni.id} value={uni.id}>{uni.name}</option>
        ))}
      </select>

      <select value={selectedDepartmentId} onChange={(e) => handleChange(e, setSelectedDepartmentId)}>
        <option value="">Departman Seçiniz</option>
        {currentDepartments.map(dept => (
          <option key={dept.id} value={dept.id}>{dept.name}</option>
        ))}
      </select>

      <select value={selectedCourseId} onChange={(e) => handleChange(e, setSelectedCourseId)}>
        <option value="">Ders Seçiniz</option>
        {currentCourses.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>

      <select value={selectedProfessorId} onChange={(e) => handleChange(e, setSelectedProfessorId)}>
        <option value="">Hoca Seçiniz</option>
        {currentProfessors.map(prof => (
          <option key={prof.id} value={prof.id}>{prof.name}</option>
        ))}
      </select>

      <button onClick={submitAssignment}>Ata</button>

      <ul>
        {assignments.map(assignment => (
          <li key={assignment.id}>
            {assignment.university} - {assignment.department} - {assignment.course} - {assignment.professor}
            <button onClick={() => handleDelete(assignment.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseAssignment;

  