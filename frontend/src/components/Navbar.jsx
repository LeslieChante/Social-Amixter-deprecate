// src/components/Navbar.jsx
import { useState } from 'react';
import { FaHome, FaUserFriends, FaUser, FaEnvelope, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { searchUsers } from '../services/userService';
import FriendRequestModal from './FriendRequestModal';

const Navbar = ({ onSectionChange, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      const results = await searchUsers(term);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setShowResults(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Amixter</h1>
      <div className="flex space-x-6">
        <button onClick={() => onSectionChange('publicaciones')} className="flex items-center space-x-1 text-white hover:text-blue-300">
          <FaHome />
          <span>Inicio</span>
        </button>
        <button onClick={() => onSectionChange('amigos')} className="flex items-center space-x-1 text-white hover:text-blue-300">
          <FaUserFriends />
          <span>Amigos</span>
        </button>
        <button onClick={() => onSectionChange('perfil')} className="flex items-center space-x-1 text-white hover:text-blue-300">
          <FaUser />
          <span>Perfil</span>
        </button>
        <button onClick={() => onSectionChange('mensajes')} className="flex items-center space-x-1 text-white hover:text-blue-300">
          <FaEnvelope />
          <span>Mensajes</span>
        </button>
        <button onClick={onLogout} className="flex items-center space-x-1 text-white hover:text-red-500">
          <FaSignOutAlt />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Campo de búsqueda */}
      <div className="relative ml-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar usuarios..."
          className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <FaSearch className="absolute right-3 top-3 text-gray-400" />

        {/* Resultados de búsqueda */}
        {showResults && (
          <div className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-lg max-h-48 overflow-y-auto z-20">
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="flex items-center p-2 cursor-pointer hover:bg-blue-100 space-x-4"
                >
                  <img
                    src={user.avatarUrl || 'https://via.placeholder.com/50'}
                    alt={user.username}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <span className="text-gray-700 font-medium">{user.username}</span>
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-500">No se encontraron resultados</p>
            )}
          </div>
        )}
      </div>

      {/* Modal de solicitud de amistad */}
      {showModal && selectedUser && (
        <FriendRequestModal
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </nav>
  );
};

Navbar.propTypes = {
  onSectionChange: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
