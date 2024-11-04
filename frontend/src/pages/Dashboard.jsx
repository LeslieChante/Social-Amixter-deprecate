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
  const [friends, setFriends] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
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
          <div className="flex justify-center space-x-8">
            {/* Formulario de publicación alineado a la izquierda y fijo */}
            <aside className="w-1/4 sticky top-20 self-start">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Crea una Publicación</h2>
              <PostForm />
            </aside>

            {/* Lista de publicaciones centrada */}
            <div className="w-3/5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Publicaciones</h2>
              <PostList />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSectionChange={setCurrentSection} onLogout={logout} />
      <main className="max-w-7xl mx-auto p-8">{renderSection()}</main>
    </div>
  );
};

export default Dashboard;
