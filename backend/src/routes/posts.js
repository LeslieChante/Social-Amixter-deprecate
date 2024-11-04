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

// Obtener las publicaciones de un usuario específico
router.get('/user/:userId', auth, postsController.getUserPosts);

// Dar o quitar "me gusta" a una publicación
router.post('/:postId/like', auth, postsController.toggleLikePost);

// Obtener todos los comentarios de una publicación específica
router.get('/:postId/comments', auth, postsController.getComments);

// Eliminar una publicación
router.delete('/:postId', auth, postsController.deletePost);

router.post('/:id/toggle-like', auth, postsController.toggleLikePost);


module.exports = router;
