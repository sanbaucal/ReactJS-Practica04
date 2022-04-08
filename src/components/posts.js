import React, { useState, useEffect } from "react";
import moment from "moment";
import Post from "./post";

const PostList = ({ posts }) => {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 3000);
  }, []);

  return spinner ? (
    <div className="d-flex justify-content-center mt-4">
      <strong>Loading... </strong>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
     !spinner && (
      <div className="row">
        {posts &&
          posts.length > 0 &&
          posts.map((postVal) => {
            return (
              <div
                className="col-xs-12 col-sm-6 col-lg-4 col-xl-3 mb-3"
                key={postVal.id}
              >
                <Post
                  author={postVal.author.name}
                  text={postVal.text.slice(0, 50)}
                  image={postVal.image}
                  createAt={moment(postVal.airdate).fromNow()}
                  like={postVal.likes}
                  comments={postVal.comments.length}
                />
              </div>
            );
          })}
      </div>
    )
  );
};

export default PostList;
