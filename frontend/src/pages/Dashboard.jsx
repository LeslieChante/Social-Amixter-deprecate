// src/pages/Dashboard.jsx
import MessagesSection from '../components/MessagesSection';
import FriendRequests from '../components/FriendRequests';
import ProfilePage from './Profile';
import PostForm from '../components/PostForm.jsx';
import PostList from '../components/PostList.jsx';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import { getFriends } from '../services/friendsService';

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState('publicaciones');
  const [friends, setFriends] = useState([]); // Estado para amigos
  const { logout } = useAuth();

  useEffect(() => {
    // Cargar amigos al montar el componente
    const loadFriends = async () => {
      const friendsData = await getFriends();
      setFriends(friendsData);
    };
    loadFriends();
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'amigos':
        return <FriendRequests />;
      case 'perfil':
        return <ProfilePage />;
      case 'mensajes':
        return <MessagesSection friends={friends} />;
      default:
        return (
          <div className="flex space-x-6">
            <div className="w-2/3">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Publicaciones</h2>
              <PostForm />
              <PostList />
            </div>
            <aside className="w-1/3 p-4 bg-white rounded-lg shadow-md max-h-[600px] overflow-y-auto sticky top-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Mensajes</h3>
              <p className="text-gray-600">Aquí estarán tus mensajes y notificaciones.</p>
            </aside>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSectionChange={setCurrentSection} onLogout={logout} />
      <main className="max-w-6xl mx-auto p-8">{renderSection()}</main>
    </div>
  );
};

export default Dashboard;
