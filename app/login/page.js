"use client";
import "../globals.css";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
 

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter both email and password');
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push('/movie_catalog');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/><br/>
      <button id="login" onClick={handleLogin}>Login</button><br/><br/>
    </div>
  );
};

export default Login;
