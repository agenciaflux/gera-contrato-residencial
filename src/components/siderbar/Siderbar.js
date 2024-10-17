// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentIcon } from '@heroicons/react/24/outline'; // Importa ícones da v2
import './styles.css'; // Importa o CSS da sidebar

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Meus Recursos</h2>
            <nav className="sidebar-nav">
                <Link to="/contrato" className="sidebar-link"> 
                    <DocumentIcon className="sidebar-icon" />
                    Residencial
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
