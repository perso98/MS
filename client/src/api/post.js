import axios from "axios";

export const findOwnerPosts = async (
  skip,
  setSkip,
  setHasMore,
  posts,
  setPosts
) => {
  try {
    await axios.get(`post/${+skip}`).then((res) => {
      const userId = res.data.userId;
      const newPosts = res.data.posts.map((post) => ({ ...post, userId }));
      setPosts([...posts, ...newPosts]);
      setSkip(skip + 5);
      setHasMore(res.data.posts.length !== 0);
    });
  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (post, setPosts, userId) => {
  const res = await axios.post("post/", {
    subject: post.subject,
    desc: post.desc,
    category: post.category,
  });

  const newPost = {
    ...post,
    createdAt: res.data.post.createdAt,
    _id: res.data.post._id,
    userId: userId,
  };
  setPosts((prevPosts) => [newPost, ...prevPosts]);
};
export const searchPost = async (search, posts, setPosts) => {
  const res = await axios.get(`/post/${search}/${posts.skip}`);

  setPosts({
    ...posts,
    data: [...posts.data, ...res.data],
    hasMore: res.data.length !== 0,
    skip: posts.skip + 5,
    loading: posts.loading ? false : null,
  });
};
