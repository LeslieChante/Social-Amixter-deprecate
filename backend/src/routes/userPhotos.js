// routes/userPhotos.js
const express = require('express');
const router = express.Router();
const userPhotosController = require('../controllers/userPhotos');
const auth = require('../middleware/auth');

// Ruta para guardar el avatar (solo URL)
router.post('/upload', auth, userPhotosController.uploadPhoto);

module.exports = router;
