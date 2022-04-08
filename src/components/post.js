import React, { useState } from 'react';

const Post = ({ image, createAt, like, author, text, comments }) => {
  const [likes, setLikes] = useState(like);

  return (
    <div className="card">
      <img src={image} className="card-img-top border-bottom" alt="..." />
      <div className="card-body">
        <div className="card-text">
          <div className="d-flex justify-content-between">
            <small className="text-muted">{createAt}</small>
            <button className={`btn btn-sm ${likes > 0 ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => setLikes(likes + 1)}
            >
              <i className={`bi ${likes > 0 ? "bi-heart-fill" : "bi-heart"}`}/> {likes}
            </button>
          </div>
        </div>
        <h5 className="card-title">{author}</h5>
        <p className="card-text">{text}...</p>
        <a href="##" className="text-muted text-decoration-none">
          <i className="bi bi-chat-left"></i> Comentarios ({comments})
        </a>
      </div>
    </div>
  );
}

export default Post;