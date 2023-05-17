import axios from "axios";

export const findOwnerPosts = async (
  skip,
  setSkip,
  setHasMore,
  posts,
  setPosts,
  id,
  setPostsLoading
) => {
  try {
    await axios.get(`/post/posts/${id}/${+skip}`).then((res) => {
      const userId = res.data.userId;
      const newPosts = res.data.posts.map((post) => ({ ...post, userId }));
      setPosts([...posts, ...newPosts]);
      setSkip(skip + 5);
      setHasMore(res.data.posts.length !== 0);
      setPostsLoading(false);
    });
  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (post, setPosts, setUser) => {
  const res = await axios.post("/post/", {
    subject: post.subject,
    desc: post.desc,
    category: post.category,
  });

  setPosts((prevPosts) => [res.data.post, ...prevPosts]);
  setUser((prevUser) => ({
    ...prevUser,
    posts: [...prevUser.posts, res.data.post._id],
  }));
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

export const getPost = async (setPost, id) => {
  const res = await axios.get(`/post/${id}`);
  setPost(res.data);
};

export const like = async (id, userId, setLikes, likes) => {
  const res = await axios.post(`/post/like`, { id });
  if (res.data.like) {
    setLikes((prevLikes) => [...prevLikes, userId]);
  } else {
    setLikes((prevLikes) => [...prevLikes.filter((like) => like !== userId)]);
  }
};

export const editPost = async (id, setPosts, post) => {
  const res = await axios.put(`/post/`, {
    id: post._id,
    category: post.category,
    subject: post.subject,
    desc: post.desc,
  });
  if (res.data.success)
    setPosts((prevPosts) => [
      ...prevPosts.map((val) => {
        if (val._id === id) return post;
        else return val;
      }),
    ]);
};

export const deletePost = async (id, setPosts, posts) => {
  const res = await axios.delete(`/post/${id}`);
  if (res.data.success) {
    if (typeof posts === "object") {
      setPosts((prevPost) => ({
        ...prevPost,
        data: [...prevPost.data.filter((val) => val._id !== id)],
      }));
    } else {
      setPosts((prevPosts) => [...prevPosts.filter((val) => val._id !== id)]);
    }
  }
};

export const findFollowsPosts = async (posts, setPosts) => {
  try {
    await axios.get(`/post/follows/posts/${posts.limit}`).then((res) => {
      const newPosts = res.data.posts.filter((post) => {
        return !posts.data.some(
          (existingPost) => existingPost._id === post._id
        );
      });
      const updatedPosts = posts.data.filter((existingPost) => {
        return res.data.posts.some((post) => post._id === existingPost._id);
      });
      if (newPosts.length > 0) {
        setPosts({
          ...posts,
          limit: posts.limit + 5,
          data: [...updatedPosts, ...newPosts],
          loading: false,
        });
      } else {
        setPosts({
          ...posts,
          hasMore: res.data.posts.length !== 0,
          loading: false,
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
};
