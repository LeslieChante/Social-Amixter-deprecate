const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friends');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Enviar solicitud de amistad
router.post('/request', auth, friendsController.sendFriendRequest);

// Aceptar solicitud de amistad
router.put('/accept/:friendId', auth, friendsController.acceptFriendRequest);

// Obtener amigos aceptados
router.get('/', auth, friendsController.getFriends);

// Obtener solicitudes de amistad pendientes
router.get('/requests', auth, friendsController.getFriendRequests);

// Eliminar una solicitud o amistad específica
router.delete('/:friendId', auth, friendsController.deleteFriendRequest); // Usa el nombre correcto aquí

module.exports = router;
