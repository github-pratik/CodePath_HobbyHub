import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import PostPage from './PostPage';
import { fetchPosts, createPost, updatePost, deletePost, upvotePost, addComment } from './postsApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState as useReactState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useReactState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      alert('Failed to load posts');
    }
    setLoading(false);
  };

  const handleCreate = async (post) => {
    try {
      const newPost = await createPost({ ...post, upvotes: 0 });
      setPosts([newPost, ...posts]);
      setFilteredPosts([newPost, ...filteredPosts]);
      setShowCreate(false);
    } catch (err) {
      alert('Failed to create post');
    }
  };

  const handleSelect = (post) => {
    setSelectedPost(post);
  };

  const handleSort = (sortType) => {
    let sorted = [...filteredPosts];
    if (sortType === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType === 'oldest') {
      sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sortType === 'most_upvoted') {
      sorted.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    }
    setFilteredPosts(sorted);
  };

  const handleSearch = (query) => {
    const q = query.toLowerCase();
    setFilteredPosts(posts.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)));
  };

  const handleUpvote = async (postId) => {
    try {
      await upvotePost(postId);
      await loadPosts();
      if (selectedPost) {
        const updated = posts.find(p => p.id === postId);
        setSelectedPost(updated);
      }
    } catch (err) {
      alert('Failed to upvote');
    }
  };

  const handleEdit = async (post) => {
    try {
      await updatePost(post);
      await loadPosts();
      setSelectedPost(post);
    } catch (err) {
      alert('Failed to update post');
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deletePost(postId);
      await loadPosts();
      setSelectedPost(null);
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      await addComment(postId, comment);
      await loadPosts();
      if (selectedPost) {
        const updated = posts.find(p => p.id === postId);
        setSelectedPost(updated);
      }
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  return (
    <div className="container-fluid py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary mb-4 rounded shadow-sm d-flex justify-content-between align-items-center px-4">
        <span className="navbar-brand fw-bold text-white fs-3">HobbyHub</span>
        <div>
          <button className="btn btn-link text-white me-3" onClick={() => { setShowCreate(false); setSelectedPost(null); }}>Home</button>
          <button className="btn btn-link text-white" onClick={() => { setShowCreate(true); setSelectedPost(null); }}>
            <span className="me-1">+</span> New Post
          </button>
        </div>
      </nav>
      {!selectedPost && !showCreate && (
        <>
          <div className="mb-4 text-start">
            <h2 className="fw-bold">Welcome to HobbyHub</h2>
            <p className="text-muted">Discover and discuss your favorite hobbies with like-minded enthusiasts</p>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostFeed
              posts={filteredPosts}
              onSelect={handleSelect}
              onSort={handleSort}
              onSearch={handleSearch}
            />
          )}
        </>
      )}
      {showCreate && !selectedPost && (
        <div className="d-flex flex-column align-items-center">
          <div className="w-100" style={{maxWidth: '600px'}}>
            <h2 className="fw-bold mb-4 text-start">Create New Post</h2>
            <PostForm onSubmit={handleCreate} />
            <button className="btn btn-secondary mt-3" onClick={() => setShowCreate(false)}>Cancel</button>
          </div>
        </div>
      )}
      {selectedPost && (
        <>
          <button className="btn btn-link mb-3" onClick={() => setSelectedPost(null)}>&larr; Back to Feed</button>
          <PostPage
            post={selectedPost}
            onUpvote={handleUpvote}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddComment={handleAddComment}
          />
        </>
      )}
    </div>
  );
}

export default App;
