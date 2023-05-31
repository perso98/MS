import axios from "axios";

export const getComments = async (id, setComments, setLoading) => {
  try {
    await axios.get(`/comment/${id}`).then((res) => {
      setComments(res.data);
      setLoading(false);
    });
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

export const addComment = async (comment, postId, user, setComments) => {
  await axios
    .post(`/comment/`, { text: comment.text, postId, userId: user._id })
    .then((res) => {
      setComments((prevComments) => [
        ...prevComments,
        {
          _id: res.data.commentId,
          ...comment,
          text: comment.text,
          user: { _id: user._id, name: user.name, surname: user.surname },
          createdAt: res.data.createdAt,
        },
      ]);
    });
};
