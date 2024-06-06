import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from './../api'; // axios instance'ı import edin

Modal.setAppElement('#root'); // Bu satırı root element id'nize göre ayarlayın

function DepartmentManager() {
  const [departments, setDepartments] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    university: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: ''
  });

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get('/universities/all');
        if (response.data.status === 'SUCCESS') {
          setUniversities(response.data.body);
        } else {
          console.error('Error fetching universities:', response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'university') {
      fetchDepartments(value);
    }
  };

  const fetchDepartments = async (universityId) => {
    try {
      const response = await api.get(`/universities/departments/all?universityId=${universityId}`);
      if (response.data.status === 'SUCCESS') {
        setDepartments(response.data.body);
      } else {
        console.error('Error fetching departments:', response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddDepartment = async () => {
    const token = localStorage.getItem('jwtToken');
    const universityId = formData.university;
    const departmentName = formData.name;

    try {
      const response = await api.post(`/universities/department?universityId=${universityId}&departmentName=${departmentName}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.status === 'SUCCESS') {
        fetchDepartments(universityId); // Yeni departmanları çek ve listeyi güncelle
        setFormData({ name: '', university: '' });
      } else {
        console.error('Error adding department:', response.data.messages);
      }
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const openEditModal = (department) => {
    setEditFormData({
      name: department.name
    });
    setSelectedDepartmentId(department.id);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleUpdateDepartment = async () => {
    const token = localStorage.getItem('jwtToken');
    const departmentName = editFormData.name;

    try {
      const response = await api.put(`/universities/editDepartment?departmentId=${selectedDepartmentId}&name=${departmentName}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.status === 'SUCCESS') {
        fetchDepartments(formData.university); // Yeni departmanları çek ve listeyi güncelle
        setIsModalOpen(false);
      } else {
        console.error('Error updating department:', response.data.messages);
      }
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Department Manager</h2>
      <div style={styles.formContainer}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Department Name"
          style={styles.input}
        />
        <select
          name="university"
          value={formData.university}
          onChange={handleInputChange}
          style={styles.select}
        >
          <option value="">Select University</option>
          {universities.map(uni => (
            <option key={uni.id} value={uni.id}>{uni.name}</option>
          ))}
        </select>
        <button onClick={handleAddDepartment} style={styles.button}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {departments.map((dept, index) => (
          <li key={index} style={styles.listItem}>
            <span style={styles.listItemText}>{dept.name}</span>
            <button onClick={() => openEditModal(dept)} style={styles.editButton}>Edit</button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
      >
        <h2>Edit Department</h2>
        <div style={styles.formContainer}>
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditInputChange}
            placeholder="Department Name"
            style={styles.input}
          />
          <button onClick={handleUpdateDepartment} style={styles.button}>
            Update
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
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
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
    border: '1px solid #ccc',
    width: '100%'
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3'
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
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  listItemText: {
    fontSize: '16px',
    color: '#333'
  },
  editButton: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#ffc107',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  editButtonHover: {
    backgroundColor: '#e0a800'
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
    padding: '30px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  }
};

export default DepartmentManager;
