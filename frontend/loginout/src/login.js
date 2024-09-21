/* eslint-disable no-lone-blocks */
// i put it to be able to write multiple lines of comments

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        
        {/* 
              e.preventDefault() : used for prevent the page 'reload automatically' 
              after the user login to control the data by easier way 
              and make it faster cause this the point of using react
        */}

        fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.hehe) {
                localStorage.setItem('username', username);  
                {/*
                        use localstorage to save the username of user 
                        because if i need it after awhile
                        localstorage : to store the data like username temporary to use it at the same time i open the page
                                       or for simplest things
                        database : to store the data of user like username or password in the server all the time bt safe way     
                */}
                navigate('/home');  
            } else {
                alert(data.ops);
            }
        });
    }
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
