import React, { useState } from 'react';

function PostFeed({ posts, onSelect, onSort, onSearch }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    onSort(e.target.value);
  };

  return (
    <div className="post-feed">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">HobbyHub</a>
        </div>
      </nav>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
        <input
          type="text"
          className="form-control w-100 w-md-50"
          placeholder="Search posts..."
          value={search}
          onChange={handleSearch}
          aria-label="Search posts"
        />
        <select className="form-select w-auto ms-md-2 mt-2 mt-md-0" value={sort} onChange={handleSort} aria-label="Sort posts">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="most_upvoted">Most Upvoted</option>
        </select>
      </div>
      <ul className="list-group">
        {posts.length === 0 && <li className="list-group-item">No posts found.</li>}
        {posts.map(post => (
          <li
            key={post.id}
            className="list-group-item list-group-item-action mb-3 shadow-sm rounded post-card"
            tabIndex={0}
            role="button"
            onClick={() => onSelect(post)}
            onKeyPress={e => { if (e.key === 'Enter') onSelect(post); }}
            aria-label={`View post titled ${post.title}`}
            style={{cursor: 'pointer'}}
          >
            <div className="fw-bold fs-5 mb-1">{post.title}</div>
            <div className="text-muted small mb-2">{post.content.slice(0, 80)}{post.content.length > 80 ? '...' : ''}</div>
            <div className="d-flex gap-2 align-items-center">
              <span className="badge bg-primary">Upvotes: {post.upvotes || 0}</span>
              <span className="badge bg-secondary">Comments: {post.comments ? post.comments.length : 0}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostFeed;