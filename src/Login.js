import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const loginRequest = {
      email: username,
      password: password
    };

    axios.post('/adminLogin', loginRequest)
      .then(response => {
        localStorage.setItem('userName', username);
        navigate('/home'); // Yönlendirme yapılacak sayfayı buraya yazın
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('Yanlış kullanıcı adı veya şifre!'); // Hata mesajı
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
}

export default LoginPage;
