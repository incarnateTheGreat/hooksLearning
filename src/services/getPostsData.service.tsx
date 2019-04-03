import axios from "axios";

export default async function getPostsData(setIsLoading, setPosts) {
  const instance = axios.create();
  instance.defaults.timeout = 2500;

  setIsLoading(true);

  await instance
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(data => {
      setPosts(data.data);
      setIsLoading(false);
    })
    .catch(error => {
      setIsLoading(false);
    });
}
