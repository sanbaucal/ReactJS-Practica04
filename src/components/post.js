import React from 'react';

class Post extends React.Component {
  state = {
    likes: this.props.likes,
  };

  onLikedClick = () => {
    this.setState({likes: this.state.likes + 1});
  };

  render() {
    return (
      <div className="card">
        <img
          src={this.props.image}
          className="card-img-top border-bottom"
          alt="..."
        />
        <div className="card-body">
          <div className="card-text">
            <div className="d-flex justify-content-between">
              <small className="text-muted">{this.props.createAt}</small>
              {this.state.likes > 0 ?
                <button
                    id="js_liked_card"
                    className="btn btn-sm btn-danger js_liked_card"
                    onClick={this.onLikedClick}
                >
                    <i className="bi bi-heart-fill"> </i>
                    {this.state.likes}
                </button>
              :
                <button
                    id="js_liked_card"
                    className="btn btn-sm btn-outline-danger js_liked_card"
                    onClick={this.onLikedClick}
                >
                    <i className="bi bi-heart"> </i>
                    {this.state.likes}
                </button>
                }
            </div>
          </div>
          <h5 className="card-title">{this.props.autor}</h5>
          <p className="card-text">{this.props.text}...</p>
          <a href="##" className="text-muted text-decoration-none">
            <i className="bi bi-chat-left"></i> Comentarios (
            {this.props.comments})
          </a>
        </div>
      </div>
    );
  }
};

export default Post;