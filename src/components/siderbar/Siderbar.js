import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentIcon } from '@heroicons/react/24/outline';
import './styles.css';

const Sidebar = ({ isSidebarVisible, onLogout }) => {
    return (
        <div className={`sidebar ${isSidebarVisible ? "open" : "closed"}`}>
            <h2 className="sidebar-title">Meus Recursos</h2>
            <nav className="sidebar-nav">
                <Link to="/gerar-contrato" className="sidebar-link">
                    <DocumentIcon className="sidebar-icon" />
                    Residencial
                </Link>
                <Link to="/gerar-contrato-comercial" className="sidebar-link">
                    <DocumentIcon className="sidebar-icon" />
                    Comercial
                </Link>
                <Link to="/gerar-recibo" className="sidebar-link">
                    <DocumentIcon className="sidebar-icon" />
                    Recibo
                </Link>
            </nav>

            {/* Botão de Logout */}
            <button onClick={onLogout} className="sidebar-link logout-button">
                Sair
            </button>
        </div>
    );
};

export default Sidebar;
