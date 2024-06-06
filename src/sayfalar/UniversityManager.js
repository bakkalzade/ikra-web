import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import api from './../api'; // axios instance'ı import edin

Modal.setAppElement('#root'); // Bu satırı root element id'nize göre ayarlayın

function UniversityManager() {
  const [universities, setUniversities] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    logo: null
  });
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    logo: null
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUniversityId, setSelectedUniversityId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get('/universities/all');
        if (response.data.status === 'SUCCESS') {
          const token = localStorage.getItem('jwtToken');
          const universitiesWithLogos = await Promise.all(
            response.data.body.map(async (university) => {
              const logoResponse = await api.get(`/universities/get-logo?universityId=${university.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              if (logoResponse.data.status === 'SUCCESS') {
                return {
                  ...university,
                  logo: `data:${logoResponse.data.body.mimeType};base64,${logoResponse.data.body.bytes}`
                };
              }
              return university;
            })
          );
          setUniversities(universitiesWithLogos);
        } else {
          console.error('Error fetching universities:', response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: value
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleAddImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddFormData({
          ...addFormData,
          logo: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData({
          ...editFormData,
          logo: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUniversity = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', addFormData.name);
    formDataToSend.append('file', addFormData.logo);
    formDataToSend.append('mailExt', addFormData.email);

    const token = localStorage.getItem('jwtToken');

    api.post('/universities', formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.data.status === 'SUCCESS') {
        setUniversities([...universities, { ...addFormData, logo: URL.createObjectURL(addFormData.logo) }]);
        setAddFormData({ name: '', email: '', logo: null });
        fileInputRef.current.value = "";
      } else {
        console.error('Error creating university:', response.data.messages);
      }
    })
    .catch(error => {
      console.error('Error creating university:', error);
    });
  };

  const openEditModal = (university) => {
    setEditFormData({
      name: university.name,
      email: university.mailExt,
      logo: university.logo
    });
    setSelectedUniversityId(university.id);
    setIsModalOpen(true);
  };

  const handleUpdateUniversity = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('universityId', selectedUniversityId);
    formDataToSend.append('name', editFormData.name);
    formDataToSend.append('file', editFormData.logo);
    formDataToSend.append('mailExt', editFormData.email);

    const token = localStorage.getItem('jwtToken');

    api.put('/universities/editUniversity', formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.data.status === 'SUCCESS') {
        const updatedUniversities = universities.map((uni) => 
          uni.id === selectedUniversityId ? { ...uni, name: editFormData.name, mailExt: editFormData.email, logo: editFormData.logo } : uni
        );
        setUniversities(updatedUniversities);
        setIsModalOpen(false);
      } else {
        console.error('Error updating university:', response.data.messages);
      }
    })
    .catch(error => {
      console.error('Error updating university:', error);
    });
  };

  return (
    <div style={styles.container}>
      <h2>University Manager</h2>
      <div style={styles.formContainer}>
        <input
          type="text"
          name="name"
          value={addFormData.name}
          onChange={handleAddInputChange}
          placeholder="Üniversite Adı"
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={addFormData.email}
          onChange={handleAddInputChange}
          placeholder="Üniversite E-mail"
          style={styles.input}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAddImageChange}
          accept="image/*"
          style={styles.fileInput}
        />
        <button onClick={handleAddUniversity} style={styles.button}>
          Ekle
        </button>
      </div>

      <ul style={styles.list}>
        {universities.map((uni, index) => (
          <li key={index} style={styles.listItem}>
            <div style={styles.listItemText}>
              <span>{uni.name}</span>
              <span>{uni.mailExt}</span>
            </div>
            {uni.logo && (
              <img src={uni.logo} alt={uni.name + " logo"} style={styles.logo} />
            )}
            <button onClick={() => openEditModal(uni)} style={styles.editButton}>Düzenle</button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
      >
        <h2>Üniversiteyi Düzenle</h2>
        <div style={styles.formContainer}>
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditInputChange}
            placeholder="Üniversite Adı"
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            value={editFormData.email}
            onChange={handleEditInputChange}
            placeholder="Üniversite E-mail"
            style={styles.input}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleEditImageChange}
            accept="image/*"
            style={styles.fileInput}
          />
          <button onClick={handleUpdateUniversity} style={styles.button}>
            Güncelle
          </button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  fileInput: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: '0'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd'
  },
  listItemText: {
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  editButton: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#ffc107',
    color: '#fff',
    cursor: 'pointer'
  }
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    borderRadius: '8px'
  }
};

export default UniversityManager;
