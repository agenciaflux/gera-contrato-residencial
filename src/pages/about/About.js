// src/pages/about/About.js

import React from 'react';
import './styles.css'; // Importa o CSS

const About = () => {
    return (
        <div className="about p-4"> {/* Adiciona classes para o espaçamento */}
            <h1 className="text-2xl font-bold">Sobre Nós</h1> {/* Adiciona classes para o estilo */}
            <p className="mt-2">Aqui você pode encontrar informações sobre o nosso aplicativo e suas funcionalidades.</p>
            <p className="mt-2">Nosso objetivo é proporcionar uma experiência intuitiva e eficiente para os usuários.</p>
        </div>
    );
};

export default About;

