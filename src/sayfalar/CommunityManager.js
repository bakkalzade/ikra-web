import React, { useState } from 'react';

function CommunityManager() {
  const [selectedUniversityId, setSelectedUniversityId] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [communities, setCommunities] = useState([]);

  const handleFileChange = (event) => {
    setLogo(event.target.files[0]);
  };

  const addOrEditCommunity = () => {
    if (!selectedUniversityId || !communityName || !email) return;

    const newCommunity = {
      id: editingId || communities.length + 1,
      universityId: selectedUniversityId,
      name: communityName,
      description,
      email,
      logoURL: logo ? URL.createObjectURL(logo) : communities.find(c => c.id === editingId)?.logoURL
    };

    if (editingId) {
      const updatedCommunities = communities.map(community => {
        if (community.id === editingId) {
          return newCommunity;
        }
        return community;
      });
      setCommunities(updatedCommunities);
    } else {
      setCommunities([...communities, newCommunity]);
    }

    // Clear the form
    clearForm();
  };

  const handleEdit = (communityId) => {
    const community = communities.find(c => c.id === communityId);
    setSelectedUniversityId(community.universityId);
    setCommunityName(community.name);
    setDescription(community.description);
    setEmail(community.email);
    setLogo(null); // We don't load the existing file due to browser security policies
    setEditingId(communityId);
  };

  const handleDelete = (communityId) => {
    setCommunities(communities.filter(community => community.id !== communityId));
  };

  const clearForm = () => {
    setSelectedUniversityId('');
    setCommunityName('');
    setDescription('');
    setEmail('');
    setLogo(null);
    document.getElementById('logoInput').value = '';
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

      <input type="text" value={communityName} onChange={(e) => setCommunityName(e.target.value)} placeholder="Topluluk İsmi" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tanım"></textarea>
      <input type="file" id="logoInput" onChange={handleFileChange} accept="image/*" />

      <button onClick={addOrEditCommunity}>{editingId ? 'Düzenlemeyi Kaydet' : 'Topluluk Ekle'}</button>

      <ul>
        {communities.map(community => (
          <li key={community.id}>
            {community.name} - {community.description} - {community.email}
            <img src={community.logoURL} alt="Logo" style={{ width: 50, height: 50 }} />
            <button onClick={() => handleEdit(community.id)}>Düzenle</button>
            <button onClick={() => handleDelete(community.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}




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
export default CommunityManager;
