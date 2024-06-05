 # Use a imagem oficial do Node.js
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o código do projeto
COPY . .

# Exponha a porta que o app usa
EXPOSE 8080

# Comando para iniciar o app
CMD [ "node", "server.js" ]