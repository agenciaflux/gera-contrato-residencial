import React from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './navbarStyles.css';

const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
    return (
        <nav className="navbar">
            <div className="text-lg">
                <Link to="/">Gerador de Contratos</Link>
            </div>

            {/* Botão de toggle do menu (hambúrguer) para telas pequenas */}
            <button onClick={toggleSidebar} className="menu-toggle md:hidden">
                {/* Usando o ícone correto, dependendo da visibilidade da sidebar */}
                {isSidebarVisible ? <XMarkIcon className="w-6 h-6 text-white" /> : <Bars3Icon className="w-6 h-6 text-white" />}
            </button>
        </nav>
    );
};

export default Navbar;
