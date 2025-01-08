const express = require('express');
const path = require('path');
const app = express();

// Serve os arquivos estáticos do build do React
app.use(express.static(path.join(__dirname, 'build')));

// Rota para servir a aplicação React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Porta 80 para produção
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
