import React, { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import getCommentsData from "../services/getCommentsData.service";

interface Comments {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

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

const DisplayComments = comments => {
  return comments.map(comment => {
    return (
      <DisplayComment key={`${comment.id}-${comment.postId}`} {...comment} />
    );
  });
};

const DisplayPostTitle = original_post => {
  return (
    original_post.title !== "" && (
      <>
        <div className="posts_container --commentPost">
          <h2 className="posts_container_title">{original_post.title}</h2>
          <span className="posts_container_body">{original_post.body}</span>
        </div>
      </>
    )
  );
};

const Comments = props => {
  const { match, location } = props;
  const [comments, setComments] = useState<Comments[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const goBack = () => {
    props.history.goBack();
  };

  // Get Comments Data
  useEffect(() => {
    setSelectedPost(location.state.post.find(p => p.id === selectedPost));
    getCommentsData(
      setIsLoadingComments,
      setComments,
      setSelectedPost,
      match.params.id
    );
  }, []);

  // Get the Original Post.
  const original_post = location.state.post.find(
    () => match.params.id === selectedPost
  ) || { title: "", body: "" };

  return (
    <div className="posts_comments">
      {isLoadingComments ? (
        <div className="loader">
          <RotateLoader color={"#123abc"} loading={true} />
        </div>
      ) : (
        <>
          <button onClick={goBack}>Go back</button>
          <div className="posts_comments_inner-container">
            {DisplayPostTitle(original_post)}
            {DisplayComments(comments)}
          </div>

          <button onClick={goBack}>Go back</button>
        </>
      )}
    </div>
  );
};

export default Comments;
