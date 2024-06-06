import React, { useState } from 'react';

function MealManager() {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [menus, setMenus] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleCreateOrUpdate = () => {
    if (!date || !description) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const newMenu = {
      id: editingId || Math.random().toString(36).substr(2, 9), // Generate a unique ID
      date,
      description
    };

    if (editingId) {
      const updatedMenus = menus.map(menu => {
        if (menu.id === editingId) {
          return newMenu;
        }
        return menu;
      });
      setMenus(updatedMenus);
      setEditingId(null);
    } else {
      setMenus([...menus, newMenu]);
    }

    // Clear the form fields
    clearForm();
  };

  const handleEdit = (menu) => {
    setDate(menu.date);
    setDescription(menu.description);
    setEditingId(menu.id);
  };

  const handleDelete = (id) => {
    setMenus(menus.filter(menu => menu.id !== id));
  };

  const clearForm = () => {
    setDate('');
    setDescription('');
    setEditingId(null);
  };

  return (
    <div>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Menü Açıklaması"></textarea>

      <button onClick={handleCreateOrUpdate}>{editingId ? 'Güncelle' : 'Oluştur'}</button>

      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            Tarih: {menu.date}, Açıklama: {menu.description}
            <button onClick={() => handleEdit(menu)}>Düzenle</button>
            <button onClick={() => handleDelete(menu.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealManager;
