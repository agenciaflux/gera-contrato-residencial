import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/siderbar/Siderbar';
import ResidentialForm from './components/residentialForm/residentialForm';
import ReciboAluguel from './components/receiptForm/receiptForm';
import CommercialForm from './components/commercialForm/CommercialForm';
import About from './pages/about/About';
import Login from './components/login/Login';
import Home from './pages/home/Home';
import { mockUsers } from './mockData/mockUser';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Inicializa como "oculto"

    // Controla o estado da Sidebar baseado no tamanho da tela
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsSidebarVisible(false); // Oculta a sidebar em telas menores que 768px
        } else {
            setIsSidebarVisible(true); // Exibe a sidebar em telas maiores
        }
    };

    useEffect(() => {
        // Detecta mudanças no tamanho da tela
        handleResize(); // Para ajustar imediatamente quando o componente for montado
        window.addEventListener('resize', handleResize); // Adiciona o listener para o redimensionamento

        return () => {
            window.removeEventListener('resize', handleResize); // Limpa o listener ao desmontar
        };
    }, []);

    const handleLogin = (email, password) => {
        const user = mockUsers.find(user => user.email === email && user.password === password);
        if (user) {
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
                    <Navbar onLogout={handleLogout} toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} isSidebarVisible={isSidebarVisible} />
                    <Sidebar isSidebarVisible={isSidebarVisible} onLogout={handleLogout} />
                    <div className={`mt-16 ${isSidebarVisible ? "ml-52" : "ml-0"} layout`}>
                        {/* Ajuste de margem com base na visibilidade da sidebar */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/gerar-contrato" element={<ResidentialForm />} />
                            <Route path="/gerar-contrato-comercial" element={<CommercialForm />} />
                            <Route path="/gerar-recibo" element={<ReciboAluguel />} />
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
