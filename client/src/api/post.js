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

export const createPost = async (post, posts, setPosts, setSkip, skip) => {
  await axios
    .post("post/", {
      subject: post.subject,
      desc: post.desc,
      category: post.category,
    })
    .then((res) => {
      const newPost = {
        ...post,
        createdAt: res.data.post.createdAt,
        id: res.data.post._id,
      };
      setSkip(skip + 1);
      setPosts([newPost, ...posts]);
    });
};
