import React, { useState, useEffect } from 'react';
import api from './../api'; // axios instance'ı import edin

function CourseManager() {
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    universityId: '',
    departmentId: '',
    name: '',
    website: '',
    code: ''
  });

  useEffect(() => {
    fetchUniversities();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'universityId') {
      fetchDepartments(value);
    } else if (name === 'departmentId') {
      fetchCourses(value);
    }
  };

  const fetchDepartments = async (universityId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await api.get(`/universities/departments/all?universityId=${universityId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.status === 'SUCCESS') {
        setDepartments(response.data.body);
      } else {
        console.error('Error fetching departments:', response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchCourses = async (departmentId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await api.get(`/courses/departmentId?departmentId=${departmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.status === 'SUCCESS') {
        setCourses(response.data.body);
      } else {
        console.error('Error fetching courses:', response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddCourse = async () => {
    const token = localStorage.getItem('jwtToken');
    const newCourse = {
      departmentId: formData.departmentId,
      universityId: formData.universityId,
      name: formData.name,
      courseCode: formData.code,
      website: formData.website
    };

    try {
      const response = await api.post('/courses', newCourse, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status === 'SUCCESS') {
        setCourses([...courses, newCourse]);
        setFormData({ universityId: '', departmentId: '', name: '', website: '', code: '' });
      } else {
        console.error('Error adding course:', response.data.messages);
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Course Manager</h2>
      <div style={styles.formContainer}>
        <select
          name="universityId"
          value={formData.universityId}
          onChange={handleInputChange}
          style={styles.select}
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
          style={styles.select}
          disabled={!formData.universityId}
        >
          <option value="">Departman Seçiniz</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Ders Adı"
          style={styles.input}
        />
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          placeholder="Ders Websitesi"
          style={styles.input}
        />
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          placeholder="Ders Kodu"
          style={styles.input}
        />
        <button onClick={handleAddCourse} style={styles.button}>
          Ekle
        </button>
      </div>

      <ul style={styles.list}>
        {courses.map((course, index) => (
          <li key={index} style={styles.listItem}>
            <span>{course.name}</span>
            <span>{course.website}</span>
            <span>{course.courseCode}</span>
          </li>
        ))}
      </ul>
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
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%'
  },
  input: {
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
    width: '100%'
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
};

export default CourseManager;
