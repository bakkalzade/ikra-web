import React, { useState } from 'react';

function CommunityAssignment() {
  const [selectedUniversityId, setSelectedUniversityId] = useState('');
  const [selectedCommunityId, setSelectedCommunityId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [assignments, setAssignments] = useState([]);

  const checkStudent = () => {
    const foundStudent = students.find(student => student.id === studentId && student.universityId === selectedUniversityId);
    if (foundStudent) {
      setStudentName(foundStudent.name);
    } else {
      setStudentName('');
      alert("Bu üniversitede böyle bir öğrenci bulunamadı.");
    }
  };

  const handleAssign = () => {
    if (!studentName) {
      alert("Geçerli bir öğrenci numarası giriniz ve öğrenciyi kontrol ediniz.");
      return;
    }
    const newAssignment = {
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
      universityId: selectedUniversityId,
      communityId: selectedCommunityId,
      studentId,
      studentName
    };
    setAssignments([...assignments, newAssignment]);
    // Clear the form fields
    setStudentId('');
    setStudentName('');
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };

  return (
    <div>
      <select value={selectedUniversityId} onChange={(e) => setSelectedUniversityId(e.target.value)}>
        <option value="">Üniversite Seçiniz</option>
        {universities.map(uni => (
          <option key={uni.id} value={uni.id}>{uni.name}</option>
        ))}
      </select>

      <select value={selectedCommunityId} onChange={(e) => setSelectedCommunityId(e.target.value)}>
        <option value="">Topluluk Seçiniz</option>
        {communities.filter(community => community.universityId === selectedUniversityId).map(community => (
          <option key={community.id} value={community.id}>{community.name}</option>
        ))}
      </select>

      <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Öğrenci Numarası" />
      <button onClick={checkStudent}>Öğrenciyi Kontrol Et</button>

      {studentName && <div>
        Öğrenci: {studentName}
        <button onClick={handleAssign}>Oluştur</button>
      </div>}

      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            Üniversite ID: {assignment.universityId}, Topluluk ID: {assignment.communityId}, Öğrenci ID: {assignment.studentId}, İsim: {assignment.studentName}
            <button onClick={() => handleDelete(assignment.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const universities = [
    { id: 'uni1', name: 'Üniversite A' },
    { id: 'uni2', name: 'Üniversite B' }
  ];
  
  const communities = [
    { id: 'com1', name: 'Topluluk X', universityId: 'uni1' },
    { id: 'com2', name: 'Topluluk Y', universityId: 'uni2' }
  ];
  
  const students = [
    { id: 'stu1', name: 'Ali Veli', universityId: 'uni1' },
    { id: 'stu2', name: 'Ayşe Fatma', universityId: 'uni2' }
  ];
  

export default CommunityAssignment;
