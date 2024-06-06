import React, { useState } from 'react';
const universities = [
    {
      id: 1,
      name: 'Üniversite A',
      departments: [
        { 
          id: 1, 
          name: 'Bilgisayar Mühendisliği',
          professors: [
            { id: 1, name: 'Prof. Dr. Ahmet Yılmaz' },
            { id: 2, name: 'Doç. Dr. Elif Kaya' }
          ]
        },
        { 
          id: 2, 
          name: 'Elektrik Mühendisliği',
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
          professors: [
            { id: 5, name: 'Prof. Dr. Ali Veli' },
            { id: 6, name: 'Doç. Dr. Derya Deniz' }
          ]
        },
        { 
          id: 4, 
          name: 'İnşaat Mühendisliği',
          professors: [
            { id: 7, name: 'Prof. Dr. Hasan Kara' },
            { id: 8, name: 'Doç. Dr. Burak Yıldırım' }
          ]
        }
      ]
    }
  ];
  
function ProfessorAssignment() {
  const [selectedUniversityId, setSelectedUniversityId] = useState('');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedProfessorId, setSelectedProfessorId] = useState('');

  const handleUniversityChange = (event) => {
    setSelectedUniversityId(event.target.value);
    setSelectedDepartmentId('');
    setSelectedProfessorId('');
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartmentId(event.target.value);
    setSelectedProfessorId('');
  };

  const handleProfessorChange = (event) => {
    setSelectedProfessorId(event.target.value);
  };

  const submitAssignment = () => {
    alert(`Hoca atandı: ${selectedProfessorId}`);
    // Burada backend ile entegrasyon yaparak hoca atamasını kaydedebilirsiniz.
  };

  const currentUniversity = universities.find(u => u.id.toString() === selectedUniversityId);
  const currentDepartments = currentUniversity ? currentUniversity.departments : [];
  const currentProfessors = selectedDepartmentId ? currentDepartments.find(d => d.id.toString() === selectedDepartmentId).professors : [];

  return (
    <div>
      <select value={selectedUniversityId} onChange={handleUniversityChange}>
        <option value="">Üniversite Seçiniz</option>
        {universities.map(uni => (
          <option key={uni.id} value={uni.id}>{uni.name}</option>
        ))}
      </select>

      <select value={selectedDepartmentId} onChange={handleDepartmentChange}>
        <option value="">Departman Seçiniz</option>
        {currentDepartments.map(dept => (
          <option key={dept.id} value={dept.id}>{dept.name}</option>
        ))}
      </select>

      <select value={selectedProfessorId} onChange={handleProfessorChange}>
        <option value="">Hoca Seçiniz</option>
        {currentProfessors.map(prof => (
          <option key={prof.id} value={prof.id}>{prof.name}</option>
        ))}
      </select>

      <button onClick={submitAssignment}>Ata</button>
    </div>
  );
}

export default ProfessorAssignment;
