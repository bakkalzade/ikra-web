import React, { useState } from 'react';

const sampleCompanies = [
  { id: 'c1', name: 'Company A', website: 'https://companya.com' },
  { id: 'c2', name: 'Company B', website: 'https://companyb.com' }
];

const sampleUniversities = [
  { id: 'u1', name: 'University A', departments: [
      { id: 'd1', name: 'Computer Science' },
      { id: 'd2', name: 'Business Administration' }
    ]
  },
  { id: 'u2', name: 'University B', departments: [
      { id: 'd3', name: 'Engineering' },
      { id: 'd4', name: 'Medicine' }
    ]
  }
];

function JobManager() {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedUniversityId, setSelectedUniversityId] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [postings, setPostings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateOrUpdate = () => {
    if (!selectedCompanyId || !selectedUniversityId || selectedDepartments.length === 0 || !deadline || !applyLink || !title || !description || !photoURL) {
      alert("Lütfen tüm alanları doldurunuz ve bir fotoğraf yükleyiniz.");
      return;
    }

    const newPosting = {
      id: editingId || Math.random().toString(36).substr(2, 9),
      selectedCompanyId,
      selectedUniversityId,
      selectedDepartments,
      deadline,
      applyLink,
      title,
      description,
      photoURL
    };

    if (editingId) {
      const updatedPostings = postings.map(posting => {
        if (posting.id === editingId) {
          return newPosting;
        }
        return posting;
      });
      setPostings(updatedPostings);
    } else {
      setPostings([...postings, newPosting]);
    }

    clearForm();
  };

  const handleEdit = (posting) => {
    setSelectedCompanyId(posting.selectedCompanyId);
    setSelectedUniversityId(posting.selectedUniversityId);
    setSelectedDepartments(posting.selectedDepartments);
    setDeadline(posting.deadline);
    setApplyLink(posting.applyLink);
    setTitle(posting.title);
    setDescription(posting.description);
    setPhotoURL(posting.photoURL);
    setEditingId(posting.id);
    document.getElementById('fileInput').value = ''; // Clear the file input
  };

  const handleDelete = (id) => {
    setPostings(postings.filter(posting => posting.id !== id));
  };

  const clearForm = () => {
    setSelectedCompanyId('');
    setSelectedUniversityId('');
    setSelectedDepartments([]);
    setDeadline('');
    setApplyLink('');
    setTitle('');
    setDescription('');
    setPhoto(null);
    setPhotoURL('');
    document.getElementById('fileInput').value = ''; // Clear the file input
    setEditingId(null);
  };

  return (
    <div>
      <select value={selectedCompanyId} onChange={(e) => setSelectedCompanyId(e.target.value)}>
        <option value="">Şirket Seçiniz</option>
        {sampleCompanies.map(company => (
          <option key={company.id} value={company.id}>{company.name}</option>
        ))}
      </select>

      <select value={selectedUniversityId} onChange={(e) => setSelectedUniversityId(e.target.value)}>
        <option value="">Üniversite Seçiniz</option>
        {sampleUniversities.map(uni => (
          <option key={uni.id} value={uni.id}>{uni.name}</option>
        ))}
      </select>

      {sampleUniversities.find(uni => uni.id === selectedUniversityId)?.departments.map(department => (
        <div key={department.id}>
          <input type="checkbox"
                 checked={selectedDepartments.includes(department.id)}
                 onChange={(e) => {
                   const newSelectedDepartments = e.target.checked
                     ? [...selectedDepartments, department.id]
                     : selectedDepartments.filter(id => id !== department.id);
                   setSelectedDepartments(newSelectedDepartments);
                 }}
          /> {department.name}
        </div>
      ))}

      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <input type="text" value={applyLink} onChange={(e) => setApplyLink(e.target.value)} placeholder="Başvuru Linki" />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Başlık" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Açıklama"></textarea>
      <input type="file" id="fileInput" onChange={handleFileChange} accept="image/*" />
      {photoURL && <img src={photoURL} alt="Preview" style={{ width: '100px', height: '100px' }} />}

      <button onClick={handleCreateOrUpdate}>{editingId ? 'Güncelle' : 'Oluştur'}</button>

      <ul>
        {postings.map((posting) => (
          <li key={posting.id}>
            {posting.title} - {posting.description}
            {posting.photoURL && <img src={posting.photoURL} alt="Posting" style={{ width: '100px', height: '100px' }} />}
            <button onClick={() => handleEdit(posting)}>Düzenle</button>
            <button onClick={() => handleDelete(posting.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobManager;
