import axios from "axios";

export const getComments = async (id, setComments, comments) => {
  await axios.get(`/comments/${id}`);
};

export const likeComment = async (id, userId, setComments) => {
  const res = await axios.post(`/comment/like`, { id });
  if (res.data.like) {
    setComments((prevComments) => [
      ...prevComments.map((comment) =>
        comment._id === id
          ? { ...comment, likes: [...comment.likes, userId] }
          : comment
      ),
    ]);
  } else {
    setComments((prevComments) => [
      ...prevComments.map((comment) =>
        comment._id === id
          ? {
              ...comment,
              likes: [...comment.likes.filter((id) => id !== userId)],
            }
          : comment
      ),
    ]);
  }
};

export const addComment = async (postId, userId, setComments) => {
  setComments((prevComments) => []);
};
