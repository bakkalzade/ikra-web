import React, { useState } from 'react';

function DepartmentManager() {
  const [departments, setDepartments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    name: '',
    university: ''
  });

  const universities = [
    { id: 1, name: 'Üniversite A' },
    { id: 2, name: 'Üniversite B' },
    { id: 3, name: 'Üniversite C' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex === -1) {
      setDepartments([...departments, formData]);
    } else {
      const updatedDepartments = departments.map((item, index) => {
        if (index === editingIndex) return formData;
        return item;
      });
      setDepartments(updatedDepartments);
      setEditingIndex(-1);
    }
    setFormData({ name: '', university: '' });
  };

  const handleEdit = (index) => {
    setFormData(departments[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDepartments = departments.filter((_, idx) => idx !== index);
    setDepartments(updatedDepartments);
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Departman Adı"
      />
      <select
        name="university"
        value={formData.university}
        onChange={handleInputChange}
      >
        <option value="">Üniversite Seçiniz</option>
        {universities.map(uni => (
          <option key={uni.id} value={uni.name}>{uni.name}</option>
        ))}
      </select>
      <button onClick={handleAddOrUpdate}>{editingIndex === -1 ? 'Ekle' : 'Güncelle'}</button>

      <ul style={{  display: 'flex', flexDirection: 'column', padding: 0}}>
        {departments.map((dept, index) => (
          <li key={index} style={{ marginBottom: '10px', padding: '10px' }}>
            {dept.name} ({dept.university})
            <button onClick={() => handleEdit(index)} style={{ margin: '0 5px' }}>Düzenle</button>
            <button onClick={() => handleDelete(index)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentManager;
