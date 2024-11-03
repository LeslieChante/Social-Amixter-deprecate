// src/pages/UserProfile.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserProfile, sendFriendRequest } from '../services/userService';

const UserProfile = () => {
  const { userId } = useParams(); // Obtiene el ID de usuario de la URL
  const [user, setUser] = useState(null);
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile(userId);
      setUser(profile);
    };

    fetchUserProfile();
  }, [userId]);

  const handleSendFriendRequest = async () => {
    const confirmation = window.confirm(`¿Deseas enviar una solicitud de amistad a ${user.username}?`);
    if (confirmation) {
      await sendFriendRequest(userId);
      setFriendRequestSent(true); // Actualiza el estado para mostrar que la solicitud fue enviada
    }
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{user.username}</h2>
      <p className="text-gray-600">Email: {user.email}</p>

      {friendRequestSent ? (
        <p className="text-green-600 mt-4">¡Solicitud de amistad enviada a {user.username}!</p>
      ) : (
        <button
          onClick={handleSendFriendRequest}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Enviar solicitud de amistad
        </button>
      )}
    </div>
  );
};

export default UserProfile;
