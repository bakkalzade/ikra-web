import React, { useState } from 'react';

function CompanyManager() {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [companies, setCompanies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleCreateOrUpdate = () => {
    if (!name || !website) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const newCompany = {
      id: editingId || Math.random().toString(36).substr(2, 9), // Generate a unique ID
      name,
      website
    };

    if (editingId) {
      const updatedCompanies = companies.map(company => {
        if (company.id === editingId) {
          return newCompany;
        }
        return company;
      });
      setCompanies(updatedCompanies);
      setEditingId(null);
    } else {
      setCompanies([...companies, newCompany]);
    }

    // Clear the form fields
    setName('');
    setWebsite('');
  };

  const handleEdit = (company) => {
    setName(company.name);
    setWebsite(company.website);
    setEditingId(company.id);
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Şirket İsmi" />
      <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Websitesi" />

      <button onClick={handleCreateOrUpdate}>{editingId ? 'Güncelle' : 'Ekle'}</button>

      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            {company.name} - {company.website}
            <button onClick={() => handleEdit(company)}>Düzenle</button>
            <button onClick={() => handleDelete(company.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyManager;
