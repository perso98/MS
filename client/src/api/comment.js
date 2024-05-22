import axios from "axios";
import { fetchData } from "./fetchData";

// Funkcja do pobierania komentarzy dla danego posta
export const getComments = async (id, comments, setComments) => {
  try {
    // Użycie funkcji fetchData do pobrania komentarzy
    fetchData(`/comment/${id}`, comments, setComments, "comments", 10);
  } catch (error) {
    // Logowanie błędów
    console.log(error);
  }
};

// Funkcja do dodawania/usuń polubienie komentarza
export const likeComment = async (id, userId, setComments) => {
  // Wysłanie zapytania PUT do aktualizacji polubień komentarza
  const res = await axios.put(`/comment/${id}`);
  // Aktualizacja stanu komentarzy na podstawie odpowiedzi serwera
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
// Funkcja do dodawania nowego komentarza
export const addComment = async (
  comment,
  postId,
  user,
  setComments,
  setCommentsIds,
  setComment
) => {
  // Wysłanie zapytania POST do utworzenia nowego komentarza
  await axios
    .post(`/comment/`, { text: comment.text, postId, userId: user._id })
    .then((res) => {
      // Aktualizacja stanu komentarzy i ich ID na podstawie odpowiedzi serwera
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
    // Resetowanie stanu pojedynczego komentarza
  setComment({ text: "", likes: [], user: {}, createdAt: "" });
};

// Funkcja do usuwania komentarza
export const deleteComment = async (
  postId,
  commentId,
  setComments,
  setCommentsIds
) => {
  // Wysłanie zapytania DELETE do usunięcia komentarza
  await axios.delete(`/comment/${postId}/${commentId}`).then((res) => {
    // Aktualizacja stanu komentarzy i ich ID na podstawie odpowiedzi serwera
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
