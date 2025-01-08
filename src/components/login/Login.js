// src/components/login/Login.js

import React, { useState } from 'react';
import './loginStyles.css';

const Login = ({ onLogin, loginError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(email, password); // Passa as credenciais para a função de login
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                {loginError && <div className="login-error">{loginError}</div>}
                <button type="submit" className="login-button">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
