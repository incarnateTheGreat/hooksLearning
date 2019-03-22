import React, { useContext } from "react";
import FormContext from "../context/form-context";

const Posts = () => {
  const { posts }: any = useContext(FormContext);

  const DisplayPost = post => {
    const { body, title } = post;

    return (
      <div className="posts_container">
        <h2 className="posts_container_title">{title}</h2>
        <span className="posts_container_body">{body}</span>
      </div>
    );
  };

  console.log("posts");

  return (
    <div className="posts">
      {posts.length > 0 ? (
        posts.map(post => <DisplayPost key={post.id} {...post} />)
      ) : (
        <div>Sorry. There are no Posts to display.</div>
      )}
    </div>
  );
};

export default Posts;
