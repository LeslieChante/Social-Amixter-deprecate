// src/components/PostList.jsx
import { usePosts } from '../context/PostContext';
import { useState } from 'react';
import { FaEllipsisH, FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';
import { createComment, fetchComments, deleteComment } from '../services/postService';

const PostList = () => {
  const { posts, likePostById, removePost } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const toggleOptions = (postId) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  const toggleComments = async (postId) => {
    if (comments[postId]) {
      setComments({ ...comments, [postId]: null });
    } else {
      const postComments = await fetchComments(postId);
      setComments({ ...comments, [postId]: postComments });
    }
  };

  const handleAddComment = async (postId) => {
    if (newComment.trim()) {
      await createComment(postId, newComment);
      const updatedComments = await fetchComments(postId);
      setComments({ ...comments, [postId]: updatedComments });
      setNewComment('');
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    await deleteComment(commentId);
    const updatedComments = await fetchComments(postId);
    setComments({ ...comments, [postId]: updatedComments });
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 relative">
          <div className="flex justify-between items-center">
            <div className="text-gray-700 font-semibold">{post.username}</div>
            <button onClick={() => toggleOptions(post.id)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
              <FaEllipsisH />
            </button>
            {selectedPostId === post.id && (
              <div className="absolute top-8 right-4 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                <button onClick={() => removePost(post.id)} className="px-4 py-2 text-red-500 hover:bg-red-100 w-full text-left">
                  Eliminar publicación
                </button>
              </div>
            )}
          </div>

          <p className="mt-2 text-gray-700">{post.content}</p>
          {post.image_url && <img src={`http://localhost:3000/${post.image_url}`} alt="Post" className="w-full mt-4 rounded-md" />}
          <small className="text-gray-500 mt-2 inline-block">{new Date(post.created_at).toLocaleString()}</small>
          <hr className="my-4" />

          <div className="flex justify-between items-center">
            <button onClick={() => likePostById(post.id)} className="flex items-center space-x-1 text-blue-500 hover:text-blue-600">
              <FaThumbsUp />
              <span>Me gusta ({post.likes_count})</span>
            </button>
            <button onClick={() => toggleComments(post.id)} className="flex items-center space-x-1 text-gray-500 hover:text-gray-600">
              <FaCommentAlt />
              <span>Comentar</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-600">
              <FaShare />
              <span>Compartir</span>
            </button>
          </div>

          {comments[post.id] && (
            <div className="mt-4 space-y-2">
              {comments[post.id].map((comment) => (
                <div key={comment.id} className="flex items-start bg-gray-100 p-3 rounded-lg relative">
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="text-gray-800 font-semibold">{comment.username}</div>
                      <button
                        onClick={() => setSelectedCommentId(selectedCommentId === comment.id ? null : comment.id)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <FaEllipsisH />
                      </button>
                      {selectedCommentId === comment.id && (
                        <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                          <button
                            onClick={() => handleDeleteComment(post.id, comment.id)}
                            className="px-4 py-2 text-red-500 hover:bg-red-100 w-full text-left"
                          >
                            Eliminar comentario
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                    <small className="text-gray-500">{new Date(comment.created_at).toLocaleString()}</small>
                  </div>
                </div>
              ))}
              <div className="mt-2 flex items-center">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe un comentario..."
                  className="w-full p-2 border rounded-md mr-2"
                />
                <button onClick={() => handleAddComment(post.id)} className="bg-blue-500 text-white px-4 py-1 rounded-md">
                  Comentar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
  