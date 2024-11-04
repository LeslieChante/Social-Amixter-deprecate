// src/components/PostForm.jsx
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
    setShowConfirmation(true);
  };

  const confirmSubmit = () => {
    if (postType === 'text') {
      addTextPost(content);
    } else if (postType === 'image' && imageFile) {
      addImagePost(content, imageFile);
    }
    setContent('');
    setImageFile(null);
    setShowConfirmation(false);
    setPostType('');
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-3xl shadow-lg max-w-md mx-auto transform transition duration-300 hover:shadow-xl">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setPostType('text')}
          className={`py-3 px-6 rounded-full font-semibold transition-colors duration-200 transform hover:scale-105 ${
            postType === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          📄 Publicar texto
        </button>
        <button
          onClick={() => setPostType('image')}
          className={`py-3 px-6 rounded-full font-semibold transition-colors duration-200 transform hover:scale-105 ${
            postType === 'image' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          🖼️ Publicar imagen
        </button>
      </div>

      {postType === 'text' && (
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <textarea
            placeholder="¿Qué estás pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-24 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-200"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transform hover:scale-105 transition duration-200"
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
            className="w-full h-24 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-200"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="block w-full text-gray-700 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transform hover:scale-105 transition duration-200"
          >
            Publicar imagen
          </button>
        </form>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center transform transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Confirmar publicación</h2>
            <p className="text-gray-600 mb-8">
              ¿Estás seguro de que deseas publicar este {postType === 'text' ? 'texto' : 'imagen'}?
            </p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={confirmSubmit}
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transform hover:scale-105 transition duration-200"
              >
                Confirmar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-400 transform hover:scale-105 transition duration-200"
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
