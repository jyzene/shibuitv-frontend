// useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Función para iniciar sesión y guardar el token
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // Validar el token con el servidor (opcional)
  const validateToken = async () => {
    try {
      // Aquí podrías hacer una llamada al servidor para validar el token
      const response = await fetch('/api/validate-token', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token inválido');
      }
    } catch (error) {
      console.error('Error validando el token', error);
      logout();
    }
  };

  // Efecto para validar el token cada vez que cambie
  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  return { token, login, logout };
};
