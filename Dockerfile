FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias primero
COPY package*.json ./

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Compilar la aplicación
RUN ng build --configuration=production

# Exponer puerto
EXPOSE 3000

# Servir la aplicación
CMD ["npx", "serve", "dist/portafolio/browser", "-s", "-l", "3000"]
