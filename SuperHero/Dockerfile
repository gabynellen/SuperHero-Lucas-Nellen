FROM node:18-alpine

WORKDIR /app

# Copia e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el código fuente
COPY . .

# Instala el CLI de Angular globalmente
RUN npm install -g @angular/cli

# Expone el puerto de desarrollo de Angular
EXPOSE 4200

# Inicia la aplicación
CMD ["ng", "serve", "--host", "0.0.0.0"]
