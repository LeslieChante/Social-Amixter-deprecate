import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FaCamera } from 'react-icons/fa';

const avatars = Array.from({ length: 100 }, (_, i) => `https://avatar.iran.liara.run/public/${i + 1}`);

const ProfilePhotoUploader = () => {
  const { user, updateProfilePhoto } = useUser();
  const [preview, setPreview] = useState(user?.photoUrl || avatars[0]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarSelect = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setShowConfirmationModal(true);
    setShowAvatarModal(false);
  };

  const handleConfirmUpload = async () => {
    try {
      await updateProfilePhoto(selectedAvatar); // Envía solo la URL
      setPreview(selectedAvatar); // Actualiza la vista previa
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Error al subir la foto:', error);
      alert("Hubo un error al subir la foto");
    }
  };

  return (
    <div className="relative w-64 h-64">
      <img
        src={preview}
        alt="Foto de Perfil"
        className="w-full h-full rounded-full object-cover border border-gray-300"
      />
      <button
        onClick={() => setShowAvatarModal(true)}
        className="cursor-pointer bg-white rounded-full p-2 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 absolute bottom-1 right-1 transform translate-x-1/2 translate-y-1/2"
        title="Editar foto"
      >
        <FaCamera className="w-4 h-4" />
      </button>

      {/* Modal de selección de avatar */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecciona tu avatar</h2>
            <div className="grid grid-cols-5 gap-3">
              {avatars.map((avatarUrl, index) => (
                <img
                  key={index}
                  src={avatarUrl}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => handleAvatarSelect(avatarUrl)}
                  className="w-16 h-16 rounded-full cursor-pointer border border-gray-300 hover:shadow-md"
                />
              ))}
            </div>
            <button
              onClick={() => setShowAvatarModal(false)}
              className="mt-6 bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">¿Guardar cambios?</h2>
            <p className="text-gray-600 mb-6">¿Estás seguro de que deseas actualizar tu foto de perfil?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
