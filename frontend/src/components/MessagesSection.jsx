// src/components/MessagesSection.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';

const MessagesSection = ({ friends = [] }) => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex space-x-6">
        <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Conversaciones</h3>
          <ul>
            {friends.map((friend) => (
              <li
                key={friend.friendId}
                onClick={() => handleSelectFriend(friend)}
                className={`p-2 cursor-pointer rounded-lg hover:bg-blue-200 ${
                  selectedFriend?.friendId === friend.friendId ? 'bg-blue-100' : ''
                }`}
              >
                {friend.username}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          {selectedFriend ? (
            <>
              <h3 className="text-2xl font-semibold text-gray-800">{selectedFriend.username}</h3>
              <MessagesList userId={selectedFriend.friendId} />
              <MessageForm
                receiverId={selectedFriend.friendId}
                onMessageSent={() => setSelectedFriend({ ...selectedFriend })}
              />
            </>
          ) : (
            <p className="text-gray-600">Selecciona una conversación para ver los mensajes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

MessagesSection.propTypes = {
  friends: PropTypes.array, // Valida que friends sea un array
};

export default MessagesSection;
