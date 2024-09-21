import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Home from './home';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;

// use browserrouter : to have ability to move to pages 
// navigate : to make the user when visit http://localhost8000 go to login page wihtout write /login
