import React, { useState, useRef } from 'react';

function UniversityManager() {
  const [universities, setUniversities] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    logo: null
  });
  const fileInputRef = useRef(null);  // Referansı dosya input'una atama

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdate = () => {
    if (editingIndex === -1) {
      setUniversities([...universities, formData]);
    } else {
      const updatedUniversities = universities.map((item, index) => {
        if (index === editingIndex) return formData;
        return item;
      });
      setUniversities(updatedUniversities);
      setEditingIndex(-1);
    }
    setFormData({ name: '', email: '', logo: null });  // Formu sıfırla
    fileInputRef.current.value = "";  // Dosya input'unu sıfırla
  };

  const handleEdit = (index) => {
    setFormData(universities[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUniversities = universities.filter((_, idx) => idx !== index);
    setUniversities(updatedUniversities);
  };

  return (
    <div style={{}}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Üniversite Adı"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Üniversite E-mail"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
      />
      <button onClick={handleAddOrUpdate}>{editingIndex === -1 ? 'Ekle' : 'Güncelle'}</button>

      <ul style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
        {universities.map((uni, index) => (
          <li key={index} style={{ marginBottom: 10, padding:"10px"}}>
            {uni.name} - {uni.email} - {uni.logo && <img src={uni.logo} alt={uni.name + " logo"} style={{ width: '50px' }} />}
            <button onClick={() => handleEdit(index)}>Düzenle</button>
            <button onClick={() => handleDelete(index)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UniversityManager;
