// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/dashboard'); // Redirige al dashboard o a la página deseada
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-aurora relative overflow-hidden">
      <div className="relative z-10 flex items-center w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-10 lg:p-20 bg-white flex flex-col items-center">
          <div className="text-center mb-8">
            <h2 className="text-6xl font-bold text-blue-600">AMIXTER</h2>
            <p className="text-3xl font-semibold text-gray-700">Crear Cuenta</p>
          </div>

          <form onSubmit={handleRegister} className="w-full space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-600">Nombre Completo</label>
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Correo Electrónico</label>
              <input
                type="email"
                placeholder="usuario@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button type="submit" className="w-full px-4 py-3 mt-8 text-white text-lg bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:from-green-500 hover:to-blue-600 transition">
              Registrarse
            </button>
          </form>

          <p className="mt-8 text-base text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-blue-500 hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </div>

        <div className="hidden lg:flex flex-col items-center w-1/2 h-full p-10 bg-white">
          <img
            src="img/logiAmis.png"
            alt="Decorativo"
            className="w-full h-full object-cover mb-4 rounded-lg"
          />
          <p className="text-2xl font-semibold text-blue-700 text-center">
            Únete y conecta con tus amigos
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
