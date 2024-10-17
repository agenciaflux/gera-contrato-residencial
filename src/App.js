// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/siderbar/Siderbar';
import WizardForm from './components/wizardForm/WizardFrom';
//import Footer from './components/footer/Footer';
import About from './pages/about/About';
import Login from './components/login/Login';
import Home from './pages/home/Home';
import { mockUser } from './mockData/mockUser';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleLogin = (email, password) => {
        if (email === mockUser.email && password === mockUser.password) {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Email ou senha incorretos');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            {isAuthenticated ? (
                <>
                    <Navbar onLogout={handleLogout} /> 
                    <Sidebar />
                    <div className="mt-16 ml-52">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/gerar" element={<WizardForm />} />
                            <Route path="/sobre" element={<About />} />
                            <Route path="*" element={<Navigate to="/gerar" />} />
                        </Routes>
                    </div>
                  
                </>
            ) : (
                <Routes>
                    <Route
                        path="/"
                        element={<Login onLogin={handleLogin} loginError={loginError} />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )}
        </Router>
    );
};

export default App;
