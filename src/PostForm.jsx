import React, { useState } from 'react';

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content, image_url: imageUrl });
      setTitle('');
      setContent('');
      setImageUrl('');
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} aria-label="Create a new post">
      <div className="mb-3">
        <label htmlFor="post-title" className="form-label">Title</label>
        <input
          id="post-title"
          className="form-control"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="post-content" className="form-label">Content</label>
        <textarea
          id="post-content"
          className="form-control"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="post-image-url" className="form-label">Image URL <span className="text-muted small">(optional)</span></label>
        <input
          id="post-image-url"
          className="form-control"
          type="text"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          aria-label="Image URL"
        />
      </div>
      <button type="submit" className="btn btn-primary">Post</button>
    </form>
  );
}

export default PostForm;