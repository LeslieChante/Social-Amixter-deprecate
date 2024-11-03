
const db = require('../models/db'); // Verifica que esta línea esté presente y correcta

exports.uploadPhoto = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { avatarUrl } = req.body;

    console.log("Avatar URL recibido:", avatarUrl); // Agrega este log

    if (!avatarUrl) {
      return res.status(400).json({ error: 'No avatar URL provided' });
    }

    await db('user_photos').insert({
      user_id: userId,
      photo_url: avatarUrl,
      is_profile: true,
    });

    await db('user_photos')
      .where({ user_id: userId })
      .andWhereNot('photo_url', avatarUrl)
      .update({ is_profile: false });

    res.status(201).json({ message: 'Avatar URL saved successfully', photo_url: avatarUrl });
  } catch (error) {
    console.error('Error saving avatar URL:', error);
    res.status(500).json({ error: 'Error saving avatar URL' });
  }
};
