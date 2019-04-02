import axios from "axios";
import React, { useContext, useState } from "react";
import FormContext from "../context/form-context";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Comments {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

const Posts = () => {
  const { posts }: any = useContext(FormContext);
  const [comments, setComments] = useState<Comments[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const DisplayPost = post => {
    const { body, title } = post;

    return (
      <div className="posts_container">
        <h2 className="posts_container_title">{title}</h2>
        <span className="posts_container_body">{body}</span>
        <span
          onClick={openComments(post.id)}
          className="posts_container_display-comments"
        >
          Display Comments
        </span>
      </div>
    );
  };

  const DisplayComments = () => {
    const res = posts.find(post => post.id === selectedPost);

    return selectedPost ? (
      <div className="posts_comments">
        <div className="posts_container --commentPost">
          <h2 className="posts_container_title">{res.title}</h2>
          <span className="posts_container_body">{res.body}</span>
        </div>
        {comments.map(comment => {
          return (
            <DisplayComment
              key={`${comment.id}-${comment.postId}`}
              {...comment}
            />
          );
        })}
        <button onClick={goBack}>Go back</button>
      </div>
    ) : (
      <div>Sorry. This doesn't work.</div>
    );
  };

  const DisplayComment = comment => {
    const { body, email, name } = comment;

    return (
      <div className="posts_comments_row">
        <h3 className="posts_comments_row_content">{name}</h3>
        <h4 className="posts_comments_row_content">{email}</h4>
        <p className="posts_comments_row_content">{body}</p>
      </div>
    );
  };

  const goBack = () => {
    setComments([]);
    setSelectedPost(null);
  };

  const openComments = (post_id: number) => (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    const comment_url = `${BASE_URL}/comments?postId=${post_id}`;

    const getCommentsData = async () => {
      const instance = axios.create();
      instance.defaults.timeout = 2500;

      setIsLoadingComments(true);

      await instance
        .get(comment_url)
        .then(data => {
          setComments(data.data);
          setSelectedPost(post_id);
          setIsLoadingComments(false);
        })
        .catch(error => {
          setIsLoadingComments(false);
        });
    };

    getCommentsData();
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
      {comments.length > 0 ? <DisplayComments /> : <DisplayPosts />}
    </div>
  );
};

export default Posts;
