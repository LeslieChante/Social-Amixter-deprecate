// src/context/PostContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchPosts, createTextPost, createImagePost, deletePost } from '../services/postService';

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData);
    };
    fetchAllPosts();
  }, []);

  const addTextPost = async (content) => {
    const newPost = await createTextPost(content);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const addImagePost = async (content, imageFile) => {
    const newPost = await createImagePost(content, imageFile);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Función para eliminar una publicación
  const removePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  return (
    <PostContext.Provider value={{ posts, addTextPost, addImagePost, removePost }}>
      {children}
    </PostContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostsProvider;
