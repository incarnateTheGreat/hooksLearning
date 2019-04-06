import axios from "axios";

export default async function getCommentsData(
  setIsLoadingComments,
  setComments,
  setSelectedPost,
  post_id
) {
  const BASE_URL = "https://jsonplaceholder.typicode.com";
  const comment_url = `${BASE_URL}/comments?postId=${post_id}`;
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
    .catch(() => {
      setIsLoadingComments(false);
    });
}
