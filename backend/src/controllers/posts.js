  const db = require('../models/db');

  // Crear un post de texto
  exports.createTextPost = async (req, res) => {
    const { content } = req.body;
    try {
      const [postId] = await db('posts')
        .insert({
          user_id: req.user.userId,
          content,
          post_type: 'text', 
        })
        .returning('id');
      res.status(201).json({ message: 'Text post created successfully', postId });
    } catch (error) {
      console.error("Error inserting text post:", error);
      res.status(500).json({ error: 'Error creating text post' });
    }
  };

  exports.createImagePost = async (req, res) => {
    try {
      if (!req.file) {
        console.log("Error: No se subió ningún archivo."); // Depuración
        return res.status(400).json({ error: 'No image file uploaded' });
      }
  
      console.log("Archivo subido exitosamente:", req.file); // Depuración
  
      const imagePath = req.file.path;
      const { content } = req.body;
  
      const [postId] = await db('posts')
        .insert({
          user_id: req.user.userId,
          content,
          image_url: imagePath,
          post_type: 'image',
        })
        .returning('id');
  
      res.status(201).json({ message: 'Image post created successfully', postId });
    } catch (error) {
      console.error("Error creando el post de imagen:", error);
      res.status(500).json({ error: 'Error creating image post' });
    }
  };
  

  // Obtener todas las publicaciones
  exports.getPosts = async (req, res) => {
    try {
      const posts = await db('posts')
        .join('users', 'posts.user_id', 'users.id')
        .select('posts.*', 'users.username as username') // Agrega el nombre del usuario a la selección
        .orderBy('posts.created_at', 'desc');
        
      res.json(posts); // Devuelve los posts con el campo 'username'
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ error: 'Error retrieving posts' });
    }
  };
  

  // Obtener una publicación específica
  exports.getPost = async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await db('posts').where({ id: postId }).first();
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error("Error retrieving post:", error);
      res.status(500).json({ error: 'Error retrieving post' });
    }
  };

  // Dar "me gusta" a un post
  exports.likePost = async (req, res) => {
    const { id } = req.params;
    try {
      await db('posts').where({ id }).increment('likes_count', 1);
      res.json({ message: 'Post liked successfully' });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ error: 'Error liking post' });
    }
  };




// Eliminar una publicación
exports.deletePost = async (req, res) => {
  console.log("Delete request received for post ID:", req.params.postId);
  const { postId } = req.params;
  try {
    const deletedRows = await db('posts').where({ id: postId }).del();
    if (deletedRows) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: 'Error deleting post' });
  }
};


// Controlador para obtener todos los comentarios de un post específico
exports.getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await db('comments')
      .where({ post_id: postId })
      .orderBy('created_at', 'asc');
    res.json(comments);
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ error: 'Error retrieving comments' });
  }
};


exports.getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await db('posts')
      .join('users', 'posts.user_id', 'users.id')
      .select('posts.*', 'users.username as username')
      .where('posts.user_id', userId)
      .orderBy('posts.created_at', 'desc');

    res.json(posts);
  } catch (error) {
    console.error("Error retrieving user's posts:", error);
    res.status(500).json({ error: 'Error retrieving user posts' });
  }
};