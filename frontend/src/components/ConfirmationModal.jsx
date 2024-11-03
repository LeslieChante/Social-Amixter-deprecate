// src/components/FriendRequestModal.jsx

import PropTypes from 'prop-types';

const FriendRequestModal = ({ user, onClose }) => {
  if (!user) return null; // Evita cargar el modal si no hay usuario definido

  const handleSendRequest = () => {
    // Lógica para enviar solicitud de amistad
    console.log(`Solicitud enviada a ${user.username}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Enviar solicitud de amistad</h2>
        <p>¿Deseas enviar una solicitud de amistad a {user.username}?</p>
        <div className="mt-4 flex space-x-4">
          <button onClick={handleSendRequest} className="bg-blue-500 text-white px-4 py-2 rounded-md">Enviar</button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

FriendRequestModal.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default FriendRequestModal;
