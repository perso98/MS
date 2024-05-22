import Post from "../models/Post.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
const postController = {
  // Funkcja do tworzenia nowego posta
  createPost: async (req, res) => {
    try {
      const { subject, desc, category } = req.body;
      // Utwórz nowy post
      const post = await Post.create({
        subject,
        desc,
        category,
        user: req.session.user._id,
      });
      // Dodaj ID posta do listy postów użytkownika
      await User.findByIdAndUpdate(
        req.session.user._id,
        { $push: { posts: post._id } },
        { new: true }
      );
      // Pobierz nowy post z zagnieżdżonym użytkownikiem
      const newPost = await Post.findById(post._id).populate(
        "user",
        "_id name surname"
      );
      // Zwróć sukces i nowy post
      res.send({ success: true, post: newPost });
    } catch (err) {
      // Wyślij błąd
      res.send({ success: false });
    }
  },
  userPosts: async (req, res) => {
    try {
      // Znajdź posty użytkownika na podstawie ID, posortuj i ogranicz do limitu
      const posts = await Post.find({
        user: req.params.id,
      })
        .sort({ createdAt: -1 })
        .limit(req.params.limit)
        .populate("user", "_id name surname");
        // Sprawdź czy liczba postów jest większa niż limit minus skok
      if (posts.length > +req.params.limit - req.params.jump) {
        // Jeśli tak to doślij kolejne
        res.send({ success: true, posts: posts });
      } else {
        // W przeciwnym wypadku doślij pustą listę
        res.send({ success: true, posts: [] });
      }
    } catch (err) {
        // Wyślij błąd
      res.send(err);
    }
  },
    // Funkcja do wyszukiwania postów na podstawie zapytania
  findPost: async (req, res) => {
    const search = req.params.search;
    // Znajdź posty, które pasują do zapytania w tytule lub opisie
    const posts = await Post.find({
      $or: [
        { subject: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(req.params.limit)
      .populate("user", "_id name surname");
      // Sprawdź czy liczba postów jest większa niż limit minus skok
    if (posts.length > +req.params.limit - req.params.jump) {
      // Jeśli tak to doślij kolejne
      res.send({ success: true, posts: posts });
    } else {
      // W przeciwnym wypadku doślij pustą listę
      res.send({ success: true, posts: [] });
    }
  },
  // Funkcja do pobierania pojedynczego posta na podstawie ID
  post: async (req, res) => {
    try {
      // Znajdź post na podstawie ID i jego użytkownika
      const post = await Post.findById(req.params.id).populate(
        "user",
        "_id name surname"
      );
      // Zwróć post
      res.send(post);
    } catch (err) {
      // Wyślij błąd
      res.send(err);
    }
  },
   // Funkcja do dodawania/usuwania polubienia posta
  like: async (req, res) => {
    try {
      const post = await Post.findById(req.body.id);
      // Dodaj polubienie jeśli użytkownik jeszcze nie polubił
      if (!post.likes.includes(req.session.user._id)) {
        const notification = await Notification.create({
          user: req.session.user._id,
          action: "likedPost",
          likedPost: post._id,
        });
        // Dodaj powiadomienie dla użytkownika posta
        await User.findByIdAndUpdate(post.user._id, {
          $push: { notifications: notification._id },
        });
        // Dodaj polubienie do posta
        await post.updateOne({ $push: { likes: req.session.user._id } });
        res.send({ like: true });
      } else {
        // Usuń polubienie jeśli użytkownik już polubił
        await post.updateOne({ $pull: { likes: req.session.user._id } });

        res.send({ like: false });
      }
    } catch (err) {
      // Zwróć błąd w odpowiedzi
      res.send(err);
    }
  },
      // Funkcja do aktualizacji posta
  updatePost: async (req, res) => {
    try {
      const { subject, desc, id } = req.body;
      // Znajdź post na podstawie ID i zaktualizuj jego treść
      await Post.findByIdAndUpdate(id, {
        desc,
        subject,
      });
      // Jeśli się powiodło to zwróć sukces na true
      res.send({ success: true });
    } catch (err) {
      // Jeśli się nie powiodło to zwróć sukces na false
      res.send({ success: false });
    }
  },
  // Funkcja do usuwania posta
  deletePost: async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);
      // Usuń post na podstawie ID
      await Post.findByIdAndDelete(req.params.id);
      // Usuń ID posta z listy postów użytkownika
      await user.updateOne({ $pull: { posts: req.params.id } });
      // Jeśli się powiodło to zwróć sukces na true
      res.send({ success: true });
    } catch (err) {
    // Jeśli się nie powiodło to zwróć sukces na false
      res.send({ success: false });
    }
  },
  // Funkcja do pobierania postów użytkowników, których obserwuje zalogowany użytkownik
  followsPosts: async (req, res) => {
    // Znajdź obserwowanych użytkowników
    const users = await User.findById(req.session.user._id).select("follows");
     // Znajdź posty tych użytkowników, posortuj i ogranicz do limitu
    const posts = await Post.find({ user: { $in: users.follows } })
      .sort({ createdAt: -1 })
      .limit(req.params.limit)
      .populate("user", "_id name surname");
      // Sprawdź czy liczba postów jest większa niż limit minus skok
    if (posts.length > +req.params.limit - req.params.jump) {
      // Jeśli tak to doślij kolejne
      res.send({ success: true, posts: posts });
    } else {
      // Jeśli nie to doślij pustą listę
      res.send({ success: true, posts: [] });
    }
  },
};
export default postController;
