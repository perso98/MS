import axios from "axios";

export const findOwnerPosts = async (
  posts,
  setPosts,
  skip,
  setSkip,
  setHasMore
) => {
  await axios.get(`post/${Number(skip)}`).then((res) => {
    if (res.data.posts.length !== 0) {
      setPosts([...posts, ...res.data.posts]);
      setSkip(skip + 5);
    } else setHasMore(false);
  });
};
