import React from 'react';

function HomePage() {

  const username = localStorage.getItem("userName");

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Hoş Geldiniz {username}</h1>
            <p>Burası ana sayfanızdır. Uygulamamıza hoş geldiniz!</p>
        </div>
    );
}

export default HomePage;
