const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages');
const auth = require('../middleware/auth'); // Middleware de autenticación

router.post('/', auth, messagesController.sendMessage);          // Enviar mensaje
router.get('/:userId', auth, messagesController.getMessages);    // Obtener mensajes con un usuario específico

module.exports = router;
