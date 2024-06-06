import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Kullanıcı adı ve şifre kontrolü
    localStorage.setItem("userName",username)
    if (password === '123') {
      navigate('/home'); // Yönlendirme
    } else {
      alert('Yanlış kullanıcı adı veya şifre!'); // Hata mesajı
    }
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
