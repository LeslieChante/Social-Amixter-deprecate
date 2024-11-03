// src/hooks/useAuthToken.js
import { useState, } from 'react';

const useAuthToken = () => {
  const [authToken, setAuthTokenState] = useState(() => localStorage.getItem('authToken'));

  // Guardar el token en localStorage cada vez que cambia
  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
      setAuthTokenState(token);
    } else {
      localStorage.removeItem('authToken');
      setAuthTokenState(null);
    }
  };

  return [authToken, setAuthToken];
};

export default useAuthToken;
