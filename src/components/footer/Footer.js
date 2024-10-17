// src/components/footer/Footer.js

import React from 'react';
import { FaLinkedin } from 'react-icons/fa'; // Importa o ícone do LinkedIn
import './styles.css'; // Importa o CSS do footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content text-center"> {/* Centraliza o conteúdo */}
                <p>&copy; {new Date().getFullYear()} Gerador de Contratos. Todos os direitos reservados.</p>
                <div className="footer-links flex justify-center items-center mt-2">
                    <a 
                        href="https://www.linkedin.com/in/jieff" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center"
                    >
                        <FaLinkedin className="w-5 h-5 mr-1" /> 
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
