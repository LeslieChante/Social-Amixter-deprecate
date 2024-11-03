import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard'); // Redirige al Dashboard después de iniciar sesión
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-aurora relative overflow-hidden">
      {/* Contenedor principal que agrupa formulario e imagen */}
      <div className="relative z-10 flex items-center w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Imagen decorativa a la izquierda */}
        <div className="hidden lg:flex flex-col items-center w-1/2 h-full p-10 bg-white">
          <img
            src="img/logiAmis.png" // Imagen decorativa
            alt="Decorativo"
            className="w-full h-full object-cover mb-4 "
          />
          <p className="text-2xl font-semibold text-blue-700 text-center">
            Comparte tus ideas con tus amigos
          </p>
        </div>

        {/* Sección del formulario de inicio de sesión */}
        <div className="w-full lg:w-1/2 p-10 lg:p-20 bg-white flex flex-col items-center border-l border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-6xl font-bold text-blue-600">AMIXTER</h2>
            <p className="text-3xl font-semibold text-gray-700">Iniciar Sesión</p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-6">
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
              Iniciar Sesión
            </button>
          </form>

          <p className="mt-8 text-base text-gray-600">
            ¿No tienes una cuenta aún?{' '}
            <Link to="/register" className="font-medium text-blue-500 hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
