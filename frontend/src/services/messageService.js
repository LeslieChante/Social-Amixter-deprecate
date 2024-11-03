import api from './api';

// Enviar un mensaje
export const sendMessage = async (receiverId, content) => {
  const response = await api.post('/messages', { receiverId, content });
  return response.data;
};

// Obtener mensajes con un usuario específico
export const getMessages = async (userId) => {
  const response = await api.get(`/messages/${userId}`);
  return response.data;
};
