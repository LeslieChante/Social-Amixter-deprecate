import { useEffect, useState } from 'react';
import {
  acceptFriendRequest,
  getFriendRequests,
  deleteFriendRequest,
  getFriends,
} from '../services/friendsService';
import { FaEllipsisV } from 'react-icons/fa';
import socket from '../socket'; // Importa el socket configurado

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState(null);
  const [showOptions, setShowOptions] = useState(null);

  useEffect(() => {
    const loadRequests = async () => {
      const requestsData = await getFriendRequests();
      setRequests(requestsData);
    };

    const loadFriends = async () => {
      const friendsData = await getFriends();
      setFriends(friendsData);
    };

    loadRequests();
    loadFriends();

    // Evento de WebSocket para recibir una nueva solicitud de amistad
    socket.on('receiveFriendRequest', (newRequest) => {
      setRequests((prevRequests) => [...prevRequests, newRequest]);
    });

    // Evento de WebSocket para cuando una solicitud de amistad se acepta
    socket.on('friendRequestAccepted', (friend) => {
      setFriends((prevFriends) => [...prevFriends, friend]);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.requesterId !== friend.friendId)
      );
    });

    // Limpiar eventos de Socket.IO al desmontar
    return () => {
      socket.off('receiveFriendRequest');
      socket.off('friendRequestAccepted');
    };
  }, []);

  const handleAcceptRequest = async (friendId) => {
    await acceptFriendRequest(friendId);
    const updatedRequests = await getFriendRequests();
    setRequests(updatedRequests);

    const updatedFriends = await getFriends();
    setFriends(updatedFriends);

    // Emitir el evento de solicitud aceptada
    socket.emit('acceptFriendRequest', { friendId });
  };

  const handleDeleteRequest = async (friendId) => {
    await deleteFriendRequest(friendId);
    const updatedRequests = await getFriendRequests();
    setRequests(updatedRequests);

    // Emitir el evento de solicitud eliminada
    socket.emit('deleteFriendRequest', { friendId });
  };

  const confirmDeleteFriend = (friend) => {
    setFriendToDelete(friend);
    setShowConfirmModal(true);
  };

  const handleDeleteFriend = async () => {
    if (friendToDelete) {
      await deleteFriendRequest(friendToDelete.friendId);
      const updatedFriends = await getFriends();
      setFriends(updatedFriends);
      setShowConfirmModal(false);
      setFriendToDelete(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Solicitudes de Amistad</h2>
      {requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li
              key={request.requesterId}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <span className="text-gray-700">Solicitud de: {request.username}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleAcceptRequest(request.requesterId)}
                  className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleDeleteRequest(request.requesterId)}
                  className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition"
                >
                  Rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No tienes solicitudes de amistad pendientes.</p>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6">Amigos</h2>
      {friends.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {friends.map((friend) => (
            <div key={friend.friendId} className="relative flex flex-col items-center space-y-2">
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  src={friend.avatarUrl || 'https://via.placeholder.com/100'}
                  alt={friend.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">{friend.username}</span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowOptions(showOptions === friend.friendId ? null : friend.friendId)
                    }
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <FaEllipsisV />
                  </button>
                  {showOptions === friend.friendId && (
                    <div className="absolute top-8 right-0 w-32 bg-white shadow-lg rounded-md text-gray-700 text-sm z-10">
                      <button
                        onClick={() => confirmDeleteFriend(friend)}
                        className="block w-full text-left px-4 py-2 hover:bg-red-100"
                      >
                        Eliminar amigo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aún no tienes amigos.</p>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">¿Eliminar amigo?</h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar a{' '}
              <strong>{friendToDelete?.username}</strong> de tus amigos?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteFriend}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
