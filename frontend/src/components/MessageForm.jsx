// src/components/MessageForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { sendMessage } from '../services/messageService';

const MessageForm = ({ receiverId, onMessageSent }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    await sendMessage(receiverId, message);
    setMessage('');
    onMessageSent(); // Llama a la función para refrescar la lista de mensajes
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600">
        Enviar
      </button>
    </form>
  );
};

MessageForm.propTypes = {
  receiverId: PropTypes.number.isRequired,
  onMessageSent: PropTypes.func.isRequired, // Asegura que onMessageSent sea proporcionado
};

export default MessageForm;
