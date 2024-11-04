import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentIcon } from '@heroicons/react/24/outline'; // Importa ícones da v2
import './styles.css'; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Meus Recursos</h2>
            <nav className="sidebar-nav">
                <Link to="/gerar-contrato" className="sidebar-link"> 
                    <DocumentIcon className="sidebar-icon" />
                    Contrato Residencial
                </Link>
                <Link to="/gerar-contrato-comercial" className="sidebar-link"> 
                    <DocumentIcon className="sidebar-icon" />
                    Contrato Comercial
                </Link>
                <Link to="/gerar-recibo" className="sidebar-link"> 
                    <DocumentIcon className="sidebar-icon" />
                    Recibo de Aluguel
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
