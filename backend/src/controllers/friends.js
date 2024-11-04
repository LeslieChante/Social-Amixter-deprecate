const db = require('../models/db');

exports.sendFriendRequest = async (req, res) => {
  const { friendId } = req.body;
  const userId = req.user.userId;
  const io = req.app.get('socketio'); // Acceso al objeto io para emitir eventos

  try {
    await db('friends').insert({ user_id: userId, friend_id: friendId, status: 'pending' });
    
    // Emitir evento de solicitud de amistad en tiempo real al receptor
    io.to(friendId).emit('friendRequestReceived', { userId, friendId, status: 'pending' });
    
    res.status(201).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send friend request' });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const { friendId } = req.params;
  const userId = req.user.userId;
  const io = req.app.get('socketio');

  try {
    await db('friends').where({ user_id: friendId, friend_id: userId }).update({ status: 'accepted' });
    
    // Emitir evento de aceptación de solicitud de amistad
    io.to(friendId).emit('friendRequestAccepted', { userId, friendId, status: 'accepted' });
    
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept friend request' });
  }
};

// Controlador de solicitudes de amistad
exports.getFriendRequests = async (req, res) => {
  const userId = req.user.userId;

  try {
    const requests = await db('friends')
      .join('users', 'friends.user_id', 'users.id') // Realiza la unión con la tabla de usuarios
      .where({ friend_id: userId, status: 'pending' })
      .select('users.id as requesterId', 'users.username', 'friends.created_at as requestedAt'); // Selecciona `username`

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error retrieving friend requests:', error);
    res.status(500).json({ error: 'Failed to retrieve friend requests' });
  }
};


exports.deleteFriendRequest = async (req, res) => {
  const { friendId } = req.params;
  const userId = req.user.userId;

  try {
      const deletedRows = await db('friends')
          .where(function() {
              this.where({ user_id: userId, friend_id: friendId })
                  .orWhere({ user_id: friendId, friend_id: userId });
          })
          .del();

      if (deletedRows) {
          res.status(200).json({ message: 'Friend request or friendship deleted successfully' });
      } else {
          res.status(404).json({ error: 'Friendship or request not found' });
      }
  } catch (error) {
      console.error('Error deleting friend request or friendship:', error);
      res.status(500).json({ error: 'Failed to delete friend request or friendship' });
  }
};

// Controlador para obtener amigos aceptados
exports.getFriends = async (req, res) => {
  const userId = req.user.userId;

  try {
    const friends = await db('friends')
      .join('users', function() {
        this.on('friends.user_id', '=', 'users.id')
          .orOn('friends.friend_id', '=', 'users.id');
      })
      .leftJoin('user_photos', function() {
        this.on('user_photos.user_id', '=', 'users.id')
          .andOn('user_photos.is_profile', '=', db.raw('?', [true]));
      })
      .where(function() {
        this.where('friends.user_id', userId)
          .orWhere('friends.friend_id', userId);
      })
      .andWhere('friends.status', 'accepted')
      .andWhereNot('users.id', userId) // Excluye al propio usuario
      .select(
        'users.id as friendId', 
        'users.username', 
        'user_photos.photo_url as avatarUrl' // Selecciona la URL del avatar
      );

    res.status(200).json(friends);
  } catch (error) {
    console.error('Error retrieving friends:', error);
    res.status(500).json({ error: 'Failed to retrieve friends' });
  }
};
