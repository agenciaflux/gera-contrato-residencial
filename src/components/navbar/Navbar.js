// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom'; 
import './navbarStyles.css';

const Navbar = ({ onLogout }) => {
    return (
        <nav className="bg-gray-800 text-white p-4 fixed w-full z-10 top-0">
            <div className="container mx-auto flex justify-between">
                <div className="text-lg font-bold">
                    <Link to="/">Gerador de Contratos</Link>
                </div>
                <div>
                    <Link to="/" className="mr-4 hover:text-gray-400">Home</Link>
                    <Link to="/sobre" className="mr-4 hover:text-gray-400">Sobre</Link>
                   <button 
                        onClick={onLogout} 
                        className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded" // Estilo do botão
                    >
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
