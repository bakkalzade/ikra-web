import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        const { jwtToken } = response.data.body; // JWT tokenını response'dan alın
        console.log(response.data.body);
        localStorage.setItem('userName', username);
        localStorage.setItem('jwtToken', jwtToken); // JWT tokenını localStorage'a kaydedin
        console.log(localStorage.getItem('jwtToken'));
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
