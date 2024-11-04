const express = require('express');
const cors = require('cors');
const knex = require('./src/models/db');
const usersRoutes = require('./src/routes/users');
const postsRoutes = require('./src/routes/posts');
const friendsRoutes = require('./src/routes/friends');
const messagesRoutes = require('./src/routes/messages');
const userPhotosRoutes = require('./src/routes/userPhotos');
const commentsRoutes = require('./src/routes/comments');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http'); 
const { Server } = require('socket.io'); 
const PORT = process.env.PORT || 3000;

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:5173', // Para desarrollo
  'https://amixter.netlify.app', // Para producción
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Configuración de archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de WebSocket para Socket.IO con CORS
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
});

// Guardar la instancia de Socket.IO para usarla en otros módulos
app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Definir rutas de la API
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/user-photos', userPhotosRoutes);
app.use('/api/comments', commentsRoutes);

// Iniciar el servidor en el puerto especificado
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Prueba de conexión a la base de datos
knex.raw('SELECT 1')
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Failed to connect to PostgreSQL:', err));
