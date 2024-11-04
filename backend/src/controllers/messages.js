const db = require('../models/db');

exports.sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.userId;
  const io = req.app.get('socketio'); // Obtiene la instancia de io

  try {
    const [messageId] = await db('messages').insert({ sender_id: senderId, receiver_id: receiverId, content }).returning('id');
    
    // Emitir el mensaje al destinatario
    io.to(receiverId).emit('messageReceived', { senderId, receiverId, content });
    
    res.status(201).json({ message: 'Message sent', messageId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.getMessages = async (req, res) => {
  const { userId } = req.params;
  const senderId = req.user.userId;
  try {
    const messages = await db('messages')
      .where({ sender_id: senderId, receiver_id: userId })
      .orWhere({ sender_id: userId, receiver_id: senderId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
