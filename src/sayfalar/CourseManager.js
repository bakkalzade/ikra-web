import React, { useState } from 'react';

const universities = [
    {
      id: 1,
      name: 'Üniversite A',
      departments: [
        { id: 1, name: 'Bilgisayar Mühendisliği' },
        { id: 2, name: 'Elektrik Mühendisliği' }
      ]
    },
    {
      id: 2,
      name: 'Üniversite B',
      departments: [
        { id: 3, name: 'Makine Mühendisliği' },
        { id: 4, name: 'İnşaat Mühendisliği' }
      ]
    }
  ];

  
function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    universityId: '',
    departmentId: '',
    name: '',
    website: '',
    code: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex === -1) {
      setCourses([...courses, formData]);
    } else {
      const updatedCourses = courses.map((item, index) => {
        if (index === editingIndex) return formData;
        return item;
      });
      setCourses(updatedCourses);
      setEditingIndex(-1);
    }
    setFormData({ universityId: '', departmentId: '', name: '', website: '', code: '' });
  };

  const handleEdit = (index) => {
    setFormData(courses[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCourses = courses.filter((_, idx) => idx !== index);
    setCourses(updatedCourses);
  };

  const filteredDepartments = formData.universityId ? universities.find(uni => uni.id.toString() === formData.universityId)?.departments : [];

  return (
    <div style={{}}>
      <select
        name="universityId"
        value={formData.universityId}
        onChange={handleInputChange}
        style={{ marginBottom: '10px', width: '300px', padding: '10px' }}
      >
        <option value="">Üniversite Seçiniz</option>
        {universities.map(uni => (
          <option key={uni.id} value={uni.id}>{uni.name}</option>
        ))}
      </select>
      <select
        name="departmentId"
        value={formData.departmentId}
        onChange={handleInputChange}
        style={{ marginBottom: '10px', width: '300px', padding: '10px' }}
      >
        <option value="">Departman Seçiniz</option>
        {filteredDepartments.map(dept => (
          <option key={dept.id} value={dept.id}>{dept.name}</option>
        ))}
      </select>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Ders Adı"
        style={{ marginBottom: '10px', width: '300px', padding: '10px' }}
      />
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleInputChange}
        placeholder="Ders Websitesi"
        style={{ marginBottom: '10px', width: '300px', padding: '10px' }}
      />
      <input
        type="text"
        name="code"
        value={formData.code}
        onChange={handleInputChange}
        placeholder="Ders Kodu"
        style={{ marginBottom: '10px', width: '300px', padding: '10px' }}
      />
      <button onClick={handleAddOrUpdate} style={{ marginBottom: '20px', padding: '10px 20px' }}>
        {editingIndex === -1 ? 'Ekle' : 'Güncelle'}
      </button>

      <ul style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
        {courses.map((course, index) => (
          <li key={index} style={{ marginBottom: '10px',  padding: '10px', textAlign: 'center' }}>
            {course.name} ({course.website}, {course.code})
            <button onClick={() => handleEdit(index)} style={{ margin: '0 5px' }}>Düzenle</button>
            <button onClick={() => handleDelete(index)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseManager;
