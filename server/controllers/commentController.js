import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
const commentController = {
  // Funkcja do pobierania komentarzy dla danego posta
  getComments: async (req, res) => {
    try {
      // Znajdź post na podstawie ID i zagnieżdżone pobierz komentarze wraz z użytkownikiem
      const post = await Post.findById(req.params.id)
        .populate({
          path: "comments",
          populate: { path: "user" },
          options: { sort: { createdAt: -1 } },
        })

        .limit(req.params.limit);

        // Sprawdź czy liczba komentarzy jest większa niż limit minus skok
      if (post.comments.length > +req.params.limit - req.params.jump) {
        res.send({ success: true, comments: post.comments });
      } else {
        res.send({ success: true, comments: [] });
      }
    } catch (err) {
       // Zwróć błąd w odpowiedzi
      res.send({ success: false });
      console.log(err);
    }
  },
  // Funkcja do tworzenia nowego komentarza
  createComment: async (req, res) => {
    const { text, postId, userId } = req.body;
    try {
       // Utwórz nowy komentarz
      const newComment = await Comment.create({
        text,
        user: userId,
      });
      // Dodaj ID komentarza do listy komentarzy posta
      const post = await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
      // Utwórz powiadomienie o nowym komentarzu
      const notification = await Notification.create({
        user: req.session.user._id,
        action: "addComment",
        addComment: post._id,
      });
      // Znajdź użytkownika posta i dodaj powiadomienie
      const postFinder = await Post.findById(postId).populate("user");
      await User.findByIdAndUpdate(postFinder.user._id, {
        $push: { notifications: notification._id },
      });
      // Zwróć sukces z ID komentarza i datą utworzenia
      res.send({
        success: true,
        commentId: newComment._id,
        createdAt: newComment.createdAt,
      });
    } catch (err) {
      // Zwróć błąd w odpowiedzi
      res.send({ success: false, message: err.message });
      console.log(err);
    }
  },
  // Funkcja do usuwania komentarza
  deleteComment: async (req, res) => {
    const { commentId, postId } = req.params;
    try {
      // Znajdź post i usuń ID komentarza z listy komentarzy
      const post = await Post.findById(postId);
      await post.updateOne({ $pull: { comments: commentId } });
      // Usuń komentarz z bazy danych
      await Comment.findByIdAndDelete(commentId);
      res.send({ success: true });
    } catch (err) {
      // Zwróć błąd w odpowiedzi
      res.send({ success: false });
    }
  },
   // Funkcja do dodawania/usuwania polubienia komentarza
  like: async (req, res) => {
    try {
      
      const comment = await Comment.findById(req.params.id);
      if (!comment.likes.includes(req.session.user._id)) {
        // Dodaj polubienie jeśli użytkownik jeszcze nie polubił
        await comment.updateOne({ $push: { likes: req.session.user._id } });
        res.send({ like: true });
      } else {
        // Usuń polubienie jeśli użytkownik już polubił
        await comment.updateOne({ $pull: { likes: req.session.user._id } });
        res.send({ like: false });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
};
export default commentController;
