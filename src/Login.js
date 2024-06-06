import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import api from './api'; // axios instance'ı import edin

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const loginRequest = {
      email: username,
      password: password
    };

    api.post('/adminLogin', loginRequest)
      .then(response => {
        localStorage.setItem('userName', username);
        localStorage.setItem('jwtToken', response.data.body.token); // JWT tokenını localStorage'a kaydedin
        console.log(localStorage.getItem('jwtToken'));
        navigate('/home'); // Yönlendirme yapılacak sayfayı buraya yazın
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('Yanlış kullanıcı adı veya şifre!'); // Hata mesajı
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" className="w-100" onClick={handleLogin}>
                  Giriş Yap
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
