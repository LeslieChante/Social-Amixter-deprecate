import { io } from 'socket.io-client';

// Conecta el cliente de Socket.IO al backend
const socket = io('http://localhost:3000'); // Ajusta la URL según corresponda

export default socket;
