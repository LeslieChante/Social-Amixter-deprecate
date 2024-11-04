// src/services/postService.js
import api from './api';

// Obtener todas las publicaciones
export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

// Crear una publicación de texto
export const createTextPost = async (content) => {
  const response = await api.post('/posts/text', { content });
  return response.data;
};

// Crear una publicación con imagen
export const createImagePost = async (content, file) => {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('image', file);

  const response = await api.post('/posts/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Función para enviar "Me gusta" a una publicación
export const likePost = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data; // Retorna el post actualizado con el nuevo contador de likes
};

// Eliminar una publicación
export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};

// **Nueva función**: Obtener publicaciones de un usuario específico
export const fetchUserPosts = async (userId) => {
  const response = await api.get(`/posts/user/${userId}`);
  return response.data;
};


// Crear un comentario
export const createComment = async (postId, content) => {
  const response = await api.post('/comments', { postId, content });
  return response.data;
};

// Obtener todos los comentarios de un post
export const fetchComments = async (postId) => {
  const response = await api.get(`/comments`, {
    params: { postId }, // Usa params para pasar postId como query parameter
  });
  return response.data;
};

// Eliminar un comentario
export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};