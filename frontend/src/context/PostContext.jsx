// src/context/PostContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchPosts, createTextPost, createImagePost, deletePost, likePost } from '../services/postService';

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

  const removePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  // Define y añade la función `likePostById` para gestionar "Me gusta"
  const likePostById = async (postId) => {
    try {
      const updatedPost = await likePost(postId); // Llama al servicio para incrementar "Me gusta"
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes_count: updatedPost.likes_count } : post
        )
      );
    } catch (error) {
      console.error('Error al dar "Me gusta" al post:', error);
    }
  };

  return (
    <PostContext.Provider value={{ posts, addTextPost, addImagePost, removePost, likePostById }}>
      {children}
    </PostContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostsProvider;
