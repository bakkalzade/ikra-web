import React, { useState } from 'react';

function AnnouncementManager() {
  const [selectedUniversityId, setSelectedUniversityId] = useState('');
  const [selectedCommunityId, setSelectedCommunityId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleCreateOrUpdate = () => {
    if (!selectedUniversityId || !selectedCommunityId || !title || !description || !photoURL) {
      alert("Lütfen tüm alanları doldurunuz ve bir fotoğraf yükleyiniz.");
      return;
    }

    if (editingId) {
      const updatedAnnouncements = announcements.map(announcement => {
        if (announcement.id === editingId) {
          return { ...announcement, universityId: selectedUniversityId, communityId: selectedCommunityId, title, description, photoURL };
        }
        return announcement;
      });
      setAnnouncements(updatedAnnouncements);
    } else {
      const newAnnouncement = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        universityId: selectedUniversityId,
        communityId: selectedCommunityId,
        title,
        description,
        photoURL
      };
      setAnnouncements([...announcements, newAnnouncement]);
    }

    // Clear the form fields
    clearForm();
  };

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

  const handleEdit = (announcement) => {
    setSelectedUniversityId(announcement.universityId);
    setSelectedCommunityId(announcement.communityId);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setPhotoURL(announcement.photoURL); // Load existing photo URL
    setPhoto(null);
    setEditingId(announcement.id);
    document.getElementById('fileInput').value = ''; // Clear the file input
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  const clearForm = () => {
    setSelectedUniversityId('');
    setSelectedCommunityId('');
    setTitle('');
    setDescription('');
    setPhoto(null);
    setPhotoURL('');
    document.getElementById('fileInput').value = ''; // Clear the file input
    setEditingId(null);
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

      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Başlık" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Açıklama"></textarea>
      <input type="file" id="fileInput" onChange={handleFileChange} accept="image/*" />
      {photoURL && <img src={photoURL} alt="Preview" style={{ width: '100px', height: '100px' }} />}

      <button onClick={handleCreateOrUpdate}>{editingId ? 'Güncelle' : 'Oluştur'}</button>

      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>
            {announcement.title} - {announcement.description}
            {announcement.photoURL && <img src={announcement.photoURL} alt="Announcement" style={{ width: '100px', height: '100px' }} />}
            <button onClick={() => handleEdit(announcement)}>Düzenle</button>
            <button onClick={() => handleDelete(announcement.id)}>Sil</button>
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

export default AnnouncementManager;
