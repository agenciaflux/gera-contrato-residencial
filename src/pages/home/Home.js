// src/pages/home/Home.js

import React from 'react';
import './styles.css'; // Importa o CSS

const Home = () => {
    return (
        <div className="home"> {/* Aplica a classe de estilos */}
            <h1 className="text-2xl font-bold">Bem-vindo ao Meu App!</h1>
            <p className="mt-2">Esta é a página inicial onde você pode encontrar informações importantes e links úteis.</p>
            <p className="mt-2">Navegue pelo menu para acessar diferentes recursos.</p>
        </div>
    );
};

export default Home;
