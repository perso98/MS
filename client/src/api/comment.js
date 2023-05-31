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
  const res = await axios.put(`/comment/${id}`);
  if (res.data.like) {
    setComments((prevComments) => ({
      ...prevComments,
      data: prevComments.data.map((comment) =>
        comment._id === id
          ? { ...comment, likes: [...comment.likes, userId] }
          : comment
      ),
    }));
  } else {
    setComments((prevComments) => ({
      ...prevComments,
      data: prevComments.data.map((comment) =>
        comment._id === id
          ? {
              ...comment,
              likes: [...comment.likes.filter((id) => id !== userId)],
            }
          : comment
      ),
    }));
  }
};

export const addComment = async (
  comment,
  postId,
  user,
  setComments,
  setCommentsIds,
  setComment
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
  setComment({ text: "", likes: [], user: {}, createdAt: "" });
};

export const deleteComment = async (
  postId,
  commentId,
  setComments,
  setCommentsIds
) => {
  await axios.delete(`/comment/${postId}/${commentId}`).then((res) => {
    if (res.data.success) {
      setCommentsIds((prevCommentsIds) =>
        prevCommentsIds.filter((id) => id !== commentId)
      );
      setComments((prevComments) => ({
        ...prevComments,
        data: prevComments.data.filter((comment) => comment._id !== commentId),
      }));
    }
  });
};
