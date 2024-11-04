// src/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={logout} />
      <main className="max-w-6xl mx-auto p-8">
        <Outlet /> {/* Renderiza la sección específica según la ruta */}
      </main>
    </div>
  );
};

export default DashboardLayout;
