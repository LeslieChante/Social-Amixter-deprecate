// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserProfile, uploadProfilePhoto } from '../services/userService';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const data = await getUserProfile();
          setUser(data);
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
          localStorage.removeItem('authToken'); // Limpia el token si hay error
          setUser(null); // Limpia el usuario en el contexto
        }
      }
    };
    fetchUserProfile();
  }, []);

  // Función para actualizar la foto de perfil del usuario
  const updateProfilePhoto = async (file) => {
    try {
      const data = await uploadProfilePhoto(file);
      setUser((prevUser) => ({
        ...prevUser,
        photoUrl: data.photo_url, // Asegúrate de que `photo_url` es el campo correcto
      }));
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateProfilePhoto }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
