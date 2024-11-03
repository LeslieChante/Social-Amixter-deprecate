import { useEffect, useState } from 'react';

import ProfilePhotoUploader from '../components/ProfilePhotoUploader';
import { fetchUserPosts } from '../services/postService'; // Asegúrate de importar el servicio
import { getUserProfile } from '../services/userService';

const ProfilePage = () => {
 
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // Estado para almacenar las publicaciones del usuario

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await getUserProfile(); // Llama al servicio sin `userId`
        setUserProfile(profile);
        const posts = await fetchUserPosts(profile.id);
        setUserPosts(posts);
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      }
    };

    loadUserProfile();
  }, []);

  if (!userProfile) {
    return <p className="text-center text-gray-500">Cargando perfil...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Información del Perfil</h1>
      <div className="flex flex-row items-center space-x-8 mb-8">
        <ProfilePhotoUploader />
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-700">{userProfile.username}</h2>
          <p className="text-gray-500">Email: {userProfile.email}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Publicaciones</h3>
        {userPosts.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
                <p className="text-gray-700">{post.content}</p>
                {post.image_url && (
                  <img src={`http://localhost:3000/${post.image_url}`} alt="Post" className="w-full mt-4 rounded-md" />
                )}
                <small className="text-gray-500">{new Date(post.created_at).toLocaleString()}</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-300 p-4 rounded-lg bg-gray-100 text-gray-500">
            <p>Aún no tienes publicaciones. ¡Comparte algo para que aparezca aquí!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
