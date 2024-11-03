import api from './api';

// Función para subir la foto de perfil, acepta una URL o un archivo
export const uploadProfilePhoto = async (input) => {
  try {
    if (typeof input === 'string') {
      // Si `input` es una URL de avatar
      const response = await api.post('/user-photos/upload', { avatarUrl: input });
      return response.data;
    } else if (input instanceof File) {
      // Si `input` es un archivo de imagen
      const formData = new FormData();
      formData.append('photo', input);

      const response = await api.post('/user-photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      throw new Error('Invalid input type. Provide a URL string or a File object.');
    }
  } catch (error) {
    console.error('Error al subir la foto:', error);
    throw error;
  }
};

// Función para obtener el perfil del usuario
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo el perfil del usuario:', error);
    throw error;
  }
};

// Función para buscar usuarios por nombre de usuario
export const searchUsers = async (query) => {
  try {
    const response = await api.get(`/users/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error buscando usuarios:', error);
    return [];
  }
};

// Función para enviar solicitud de amistad
export const sendFriendRequest = async (friendId) => {
  try {
    await api.post('/friends/request', { friendId });
  } catch (error) {
    console.error('Error enviando solicitud de amistad:', error);
  }
};
