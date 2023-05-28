import axios from "axios";
import { fetchData } from "./fetchData";
export const findOwnerPosts = async (posts, setPosts, id) => {
  try {
    await fetchData(`/post/posts/${id}`, posts, setPosts, "posts");
  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (post, setPosts, setUser) => {
  const res = await axios.post("/post/", {
    subject: post.subject,
    desc: post.desc,
  });

  setPosts((prevPosts) => ({
    ...prevPosts,
    data: [res.data.post, ...prevPosts.data],
  }));
  setUser((prevUser) => ({
    ...prevUser,
    posts: [...prevUser.posts, res.data.post._id],
  }));
};
export const findFollowsPosts = async (posts, setPosts) => {
  await fetchData("/post/follows/posts", posts, setPosts, "posts");
};

export const searchPost = async (search, posts, setPosts) => {
  await fetchData(`/post/${search}`, posts, setPosts, "posts");
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
    setPosts((prevPost) => ({
      ...prevPost,
      data: [...prevPost.data.filter((val) => val._id !== id)],
    }));
  } else {
    setPosts((prevPosts) => [...prevPosts.filter((val) => val._id !== id)]);
  }
};
