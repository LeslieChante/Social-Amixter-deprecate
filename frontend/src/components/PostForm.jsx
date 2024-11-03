import { useState } from 'react';
import { usePosts } from '../context/PostContext';

const PostForm = () => {
  const [postType, setPostType] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { addTextPost, addImagePost } = usePosts();

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Muestra el modal antes de confirmar
  };

  const confirmSubmit = () => {
    if (postType === 'text') {
      addTextPost(content);
    } else if (postType === 'image' && imageFile) {
      addImagePost(content, imageFile);
    }
    // Limpia los campos
    setContent('');
    setImageFile(null);
    setShowConfirmation(false);
    setPostType(''); // Reinicia el tipo de post
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      {/* Selector de tipo de publicación */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setPostType('text')}
          className={`py-2 px-6 rounded-lg font-semibold ${
            postType === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          Publicar texto
        </button>
        <button
          onClick={() => setPostType('image')}
          className={`py-2 px-6 rounded-lg font-semibold ${
            postType === 'image' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          Publicar imagen
        </button>
      </div>

      {/* Formulario según el tipo de post */}
      {postType === 'text' && (
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <textarea
            placeholder="¿Qué estás pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-24 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Publicar texto
          </button>
        </form>
      )}

      {postType === 'image' && (
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <textarea
            placeholder="Añade una descripción..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-24 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="block w-full text-gray-500 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Publicar imagen
          </button>
        </form>
      )}

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Confirmar publicación</h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas publicar este {postType === 'text' ? 'texto' : 'imagen'}?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmSubmit}
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors"
              >
                Confirmar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-400 transition-colors"
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

export default PostForm;
