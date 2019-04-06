import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FormContext from "../context/form-context";

const Posts = () => {
  const { posts }: any = useContext(FormContext);

  const DisplayPost = post => {
    const { body, title } = post;

    return (
      <div className="posts_container">
        <h2 className="posts_container_title">{title}</h2>
        <span className="posts_container_body">{body}</span>
        <Link
          to={{
            pathname: `/posts/comments/${post.id}`,
            state: {
              post: posts
            }
          }}
          className="posts_container_display-comments"
        >
          Display Comments
        </Link>
      </div>
    );
  };

  const DisplayPosts = () => {
    return posts.length > 0 ? (
      posts.map(post => <DisplayPost key={post.id} {...post} />)
    ) : (
      <div>Sorry. There are no Posts to display.</div>
    );
  };

  return (
    <div className="posts view-container">
      <DisplayPosts />
    </div>
  );
};

export default Posts;
