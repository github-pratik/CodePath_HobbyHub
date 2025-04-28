import React, { useState } from 'react';
import { fetchComments } from './postsApi';

function PostPage({ post, onUpvote, onEdit, onDelete, onAddComment }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [editImageUrl, setEditImageUrl] = useState(post.image_url || post.imageUrl || '');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const loadComments = async () => {
    try {
      const data = await fetchComments(post.id);
      setComments(data.map(c => c.content));
    } catch (err) {
      // Optionally handle error
    }
  };

  React.useEffect(() => {
    loadComments();
    // eslint-disable-next-line
  }, [post.id]);

  const handleEdit = () => {
    if (editTitle.trim() && editContent.trim()) {
      onEdit({ ...post, title: editTitle, content: editContent, image_url: editImageUrl });
      setEditing(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await onAddComment(post.id, comment);
      setComment('');
      loadComments();
    }
  };

  return (
    <div className="post-page card p-4 shadow-sm rounded">
      {editing ? (
        <div>
          <input
            className="form-control mb-2 fs-5"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            aria-label="Edit post title"
          />
          <textarea
            className="form-control mb-2"
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            aria-label="Edit post content"
          />
          <input
            className="form-control mb-2"
            value={editImageUrl}
            onChange={e => setEditImageUrl(e.target.value)}
            placeholder="Image URL (optional)"
            aria-label="Edit image URL"
          />
          <button className="btn btn-success me-2" onClick={handleEdit}>Save</button>
          <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          {post.image_url || post.imageUrl ? (
            <div className="mb-3 text-center">
              <img src={post.image_url || post.imageUrl} alt="Post visual" className="img-fluid rounded mb-2 post-image" style={{maxHeight: '350px', objectFit: 'cover'}} />
            </div>
          ) : null}
          <h2 className="fw-bold mb-2">{post.title}</h2>
          <p className="mb-3">{post.content}</p>
          <div className="mb-3 d-flex gap-2 align-items-center flex-wrap">
            <button className="btn btn-outline-primary me-2" onClick={() => onUpvote(post.id)} aria-label="Upvote post">Upvote <span className="badge bg-primary ms-1">{post.upvotes || 0}</span></button>
            <button className="btn btn-outline-secondary me-2" onClick={() => setEditing(true)} aria-label="Edit post">Edit</button>
            <button className="btn btn-outline-danger" onClick={() => onDelete(post.id)} aria-label="Delete post">Delete</button>
          </div>
        </>
      )}
      <hr />
      <h5 className="mb-3">Comments</h5>
      <div className="comments-section mb-3">
        <ul className="list-group">
          {comments && comments.length > 0 ? (
            comments.map((c, i) => (
              <li key={i} className="list-group-item py-2 px-3">{c}</li>
            ))
          ) : (
            <li className="list-group-item">No comments yet.</li>
          )}
        </ul>
      </div>
      <form className="d-flex gap-2 align-items-center" onSubmit={handleComment} aria-label="Add a comment">
        <input
          className="form-control"
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          aria-label="Comment input"
        />
        <button className="btn btn-primary" type="submit">Comment</button>
      </form>
    </div>
  );
}

export default PostPage;