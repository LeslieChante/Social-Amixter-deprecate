// src/services/friendsService.js
import api from './api'; // Asegúrate de tener tu configuración base de axios en este archivo

// Enviar solicitud de amistad
export const sendFriendRequest = async (friendId) => {
  const response = await api.post('/friends/request', { friendId });
  return response.data;
};

// Aceptar solicitud de amistad
export const acceptFriendRequest = async (friendId) => {
  const response = await api.put(`/friends/accept/${friendId}`);
  return response.data;
};

// Obtener solicitudes de amistad pendientes
export const getFriendRequests = async () => {
  const response = await api.get('/friends/requests');
  return response.data;
};

// Eliminar una solicitud o amistad específica
export const deleteFriendRequest = async (friendId) => {
  const response = await api.delete(`/friends/${friendId}`);
  return response.data;
};

// Obtener lista de amigos aceptados
export const getFriends = async () => {
  try {
    const response = await api.get('/friends'); // Endpoint que devuelve amigos con `avatarUrl` y `username`
    return response.data;
  } catch (error) {
    console.error('Error obteniendo amigos:', error);
    return [];
  }
};