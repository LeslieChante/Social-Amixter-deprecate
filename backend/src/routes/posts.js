// routes/posts.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

// Crear un post de solo texto
router.post('/text', auth, postsController.createTextPost);

// Crear un post con imagen
router.post('/image', auth, upload.single('image'), postsController.createImagePost);

// Obtener todas las publicaciones
router.get('/', auth, postsController.getPosts);

// Obtener una publicación específica
router.get('/:postId', auth, postsController.getPost);

// **Nueva ruta**: Obtener las publicaciones de un usuario específico
router.get('/user/:userId', auth, postsController.getUserPosts);

// Dar "me gusta" a una publicación
router.post('/:id/like', auth, postsController.likePost);

// Obtener todos los comentarios de una publicación específica
router.get('/:postId/comments', auth, postsController.getComments);

// Eliminar una publicación
router.delete('/:postId', auth, postsController.deletePost);

module.exports = router;
