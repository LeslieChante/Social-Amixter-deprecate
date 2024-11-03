const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db('users').insert({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Inicio de sesión de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db('users').where({ email }).first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Obtener los datos básicos del usuario
    const user = await db('users').where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Obtener la foto de perfil del usuario
    const profilePhoto = await db('user_photos')
      .where({ user_id: userId, is_profile: true })
      .first();

    // Obtener los posts realizados por el usuario
    const posts = await db('posts').where({ user_id: userId });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      photoUrl: profilePhoto ? profilePhoto.photo_url : null,
      posts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile data' });
  }
};

exports.searchUsers = async (req, res) => {
  const { query } = req.query;

  try {
    const users = await db('users')
      .where('username', 'like', `%${query}%`)
      .select('id', 'username'); // Selecciona solo los campos necesarios
    res.json(users);
  } catch (error) {
    console.error('Error buscando usuarios:', error);
    res.status(500).json({ error: 'Error buscando usuarios' });
  }
};

exports.getUserProfileById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await db('users').where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profilePhoto = await db('user_photos').where({ user_id: userId, is_profile: true }).first();
    const posts = await db('posts').where({ user_id: userId });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      photoUrl: profilePhoto ? profilePhoto.photo_url : null,
      posts,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};
