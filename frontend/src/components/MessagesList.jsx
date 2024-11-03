// src/components/MessagesList.jsx
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMessages } from '../services/messageService';

const MessagesList = ({ userId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await getMessages(userId);
      setMessages(messagesData);
    };
    if (userId) fetchMessages();
  }, [userId]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-h-64 overflow-y-auto">
      {messages.map((message) => (
        <div key={message.id} className={`mb-2 ${message.sender_id === userId ? 'text-right' : 'text-left'}`}>
          <p className="p-2 bg-blue-500 text-white rounded-lg inline-block">{message.content}</p>
          <small className="block text-gray-500">{new Date(message.sent_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

MessagesList.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default MessagesList;
