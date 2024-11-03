import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import ProfilePage from '../pages/Profile';
import UserProfile from '../pages/UserProfile'; // Importa la nueva página de perfil de usuario
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ProfilePage /> {/* Ruta para el perfil personal del usuario */}
          </ProtectedRoute>
        }
      />

      {/* Nueva ruta protegida para el perfil de otros usuarios */}
      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <UserProfile /> {/* Ruta para ver el perfil de un usuario específico */}
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;
