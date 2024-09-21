/* eslint-disable no-lone-blocks */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// useNavigate : for redirect the page to certain page after finish the form

import './App.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.hehe) {
                localStorage.setItem('username', username);
                navigate('/home');
            } else {
                alert(data.ops);
            }
        });
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
