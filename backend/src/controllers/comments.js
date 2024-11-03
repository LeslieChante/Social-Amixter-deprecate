const db = require('../models/db');

// Crear un comentario
exports.createComment = async (req, res) => {
  const { postId, content } = req.body;

  // Verifica si `postId` y `content` están presentes
  if (!postId || !content) {
    return res.status(400).json({ error: 'postId and content are required' });
  }

  try {
    const [commentId] = await db('comments').insert({
      post_id: postId,
      user_id: req.user.userId,
      content,
    }).returning('id');
    
    res.status(201).json({ message: 'Comment created successfully', commentId });
  } catch (error) {
    console.error("Error creating comment:", error); // Log del error completo
    res.status(500).json({ error: 'Error creating comment', details: error.message });
  }
};


// Obtener todos los comentarios de un post
exports.getComments = async (req, res) => {
  const { postId } = req.query; // Usando query en lugar de params para evitar errores de ruta

  try {
    const comments = await db('comments')
      .join('users', 'comments.user_id', 'users.id') // Unir con la tabla de usuarios
      .where({ post_id: postId })
      .select('comments.*', 'users.username') // Seleccionar comentarios y nombre de usuario
      .orderBy('comments.created_at', 'asc');
    res.json(comments);
  } catch (error) {
    console.error("Error retrieving comments:", error); // Log detallado del error
    res.status(500).json({ error: 'Error retrieving comments' });
  }
};


// Eliminar un comentario
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedRows = await db('comments')
      .where({ id: commentId })
      .del();
    if (deletedRows) {
      res.json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
