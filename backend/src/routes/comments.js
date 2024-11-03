const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const auth = require('../middleware/auth');

// Crear un comentario (requiere `postId` en el body)
router.post('/', auth, commentsController.createComment);

// Obtener todos los comentarios de un post específico (requiere `postId` en el body)
router.get('/', auth, commentsController.getComments);

// Eliminar un comentario específico
router.delete('/:commentId', auth, commentsController.deleteComment);

module.exports = router;
