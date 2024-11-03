# Usa una imagen base de Node.js
FROM node:14

# Crea el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que el backend escucha
EXPOSE 3000

# Comando de inicio que ejecuta el servidor
CMD ["npm", "run", "start"]
