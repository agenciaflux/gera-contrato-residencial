# Usar a imagem oficial do Node.js
FROM node:18

# Criar o diretório de trabalho
WORKDIR /app

# Copiar o package.json e instalar as dependências
COPY package*.json ./
RUN npm install

# Copiar os arquivos da aplicação
COPY . .

# Expor a porta que o Node.js irá rodar
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
