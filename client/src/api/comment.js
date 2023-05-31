import axios from "axios";
import { fetchData } from "./fetchData";
export const getComments = async (id, comments, setComments) => {
  try {
    fetchData(`/comment/${id}`, comments, setComments, "comments", 10);
  } catch (error) {
    console.log(error);
  }
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

export const addComment = async (
  comment,
  postId,
  user,
  setComments,
  setCommentsIds
) => {
  await axios
    .post(`/comment/`, { text: comment.text, postId, userId: user._id })
    .then((res) => {
      setCommentsIds((prevCommentsIds) => [
        ...prevCommentsIds,
        res.data.commentId,
      ]);
      setComments((prevComments) => ({
        ...prevComments,
        data: [
          {
            _id: res.data.commentId,
            ...comment,
            text: comment.text,
            user: { _id: user._id, name: user.name, surname: user.surname },
            createdAt: res.data.createdAt,
          },
          ...prevComments.data,
        ],
      }));
    });
};
