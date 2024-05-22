import axios from "axios";
import { fetchData } from "./fetchData";

// Funkcja do pobierania postów właściciela
export const findOwnerPosts = async (posts, setPosts, id) => {
  try {
    await fetchData(`/post/posts/${id}`, posts, setPosts, "posts", 5);
  } catch (err) {
    console.error(err);
  }
};

// Funkcja do tworzenia nowego posta
export const createPost = async (post, setPosts, setUser, setPost) => {
  const res = await axios.post("/post/", {
    subject: post.subject,
    desc: post.desc,
  });
  // Aktualizacja stanu postów i użytkownika
  setPosts((prevPosts) => ({
    ...prevPosts,
    data: [res.data.post, ...prevPosts.data],
  }));
  setPost({ subject: "", desc: "" });
  setUser((prevUser) => ({
    ...prevUser,
    posts: [...prevUser.posts, res.data.post._id],
  }));
};
// Funkcja do pobierania postów obserwowanych użytkowników
export const findFollowsPosts = async (posts, setPosts) => {
  await fetchData("/post/follows/posts", posts, setPosts, "posts", 5);
};
// Funkcja do wyszukiwania postów
export const searchPost = async (search, posts, setPosts) => {
  await fetchData(`/post/${search}`, posts, setPosts, "posts", 5);
};
// Funkcja do pobierania pojedynczego posta
export const getPost = async (setPost, id, setLoading) => {
  await axios.get(`/post/${id}`).then((res) => {
    setPost({ data: [res.data] });
    setLoading(false);
  });
};
// Funkcja do dodawania/usuwania polubienia posta
export const like = async (id, userId, setLikes) => {
  const res = await axios.post(`/post/like`, { id });
  if (res.data.like) {
    setLikes((prevLikes) => [...prevLikes, userId]);
  } else {
    setLikes((prevLikes) => [...prevLikes.filter((like) => like !== userId)]);
  }
};
// Funkcja do edytowania posta
export const editPost = async (id, setPosts, post, user) => {
  await axios
    .put(`/post/`, {
      id: post._id,
      subject: post.subject,
      desc: post.desc,
    })
    .then((res) => {
      if (res.data.success) {
        // Aktualizacja stanu postów po edycji
        setPosts((prevPosts) => ({
          ...prevPosts,
          data: prevPosts.data.map((val) => {
            if (val._id === id) return { ...post, user: user };
            else return val;
          }),
        }));
      }
    });
};

// Funkcja do usuwania posta
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
