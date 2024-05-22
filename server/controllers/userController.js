import bcrypt from "bcrypt";
import User from "../models/User.js";

const userController = {
  // Rejestracja nowego użytkownika
  register: async (req, res) => {
    const { email, name, surname, password } = req.body;
    // Sprawdzenie, czy użytkownik już istnieje w bazie danych
    const user = await User.findOne({ email });
    // Jeśli użytkownik nie istnieje w bazie danych, to zostaje utworzony
    if (!user) {
      // Hashowanie hasła
      const hashedPassword = await bcrypt.hash(password, 10);
      // Tworzenie nowego użytkownika
      await User.create({
        email,
        name,
        surname,
        password: hashedPassword,
      });
      // Jeśli się powiodło to zwróć sukces na true i wyślij powiadomienie 
      res.send({ message: "Account created", success: true });
    } else {
      // Jeśli się nie powiodło to zwróć sukces na false i wyślij powiadomienie 
      res.send({ message: "E-mail is already in database", success: false });
    }
  },
  // Logowanie użytkownika
  login: async (req, res) => {
    const { email, password } = req.body;
    // Sprawdzenie, czy użytkownik istnieje
    const user = await User.findOne({
      email,
    });
    // Jeśli użytkownik istnieje to następuje sprawdzenie
    if (user) {
      // Odhashowanie hasła użytkownika
      const passwordMatch = await bcrypt.compare(password, user.password);
      // Jeśli hasła się zgadzają to następuje usunięcie hasła z sesji w celach bezpieczeństwa
      if (passwordMatch) {
        delete user.password;
        // Nadanie sesji dla użytkownika
        req.session.user = user;
        // Przekazanie użytkownika do frontu
        res.send({ user: user, success: true });
      }
      // Niepoprawne hasło 
      else res.send({ message: "Password isn't correct", success: false });
    } 
    // Użytkownik nie istnieje
    else res.send({ message: "User doesn't exist", success: false });
  },
  // Autoryzacja użytkownika
  auth: async (req, res) => {
    // Sprawdzenie, czy użytkownik jest zalogowany
    if (req.session.user) {
      // Jeśli użytkownik jest zalogowany to prześlij użytkownika do frontu
      const user = req.session.user;
      // Usunięcie hasła z sesji w celach bezpieczeństwa
      delete user.password;
      // Wysyłka do frontu
      res.send({ success: true, user: user });
    }
    // Jeśli użytkownik nie jest zalogowany to zwróć błąd 
    else res.send({ success: false });
  },
  // Wylogowanie użytkownika
  logout: async (req, res) => {
    if (req.session.user) {
      // Usunięcie sesji dla użytkownika
      req.session.destroy();
      res.send("Logout success");
    }
    // Jeśli użytkownik nie jest zalogowany to zwróć informacje 
    else res.send("You are not logged in");
  },
  // Wyszukiwanie użytkowników
  findUser: async (req, res) => {
    try {
      const search = req.params.search;
      // Znalezienie użytkowników na podstawie kryteriów wyszukiwania
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { surname: { $regex: search, $options: "i" } },
        ],
      })
        .sort({ createdAt: -1 })
        .limit(+req.params.limit)
        .select("-password");
      if (users.length > +req.params.limit - req.params.jump) {
        res.send({ success: true, users: users });
      } else {
        res.send({ success: true, users: [] });
      }
    } catch (error) {
      console.error(error);
    }
  },
  // Dodawanie lub usuwanie obserwacji użytkownika
  follow: async (req, res) => {
    const { id } = req.body;
    const userId = req.session.user._id;
    try {
      const user = await User.findByIdAndUpdate(userId);
      const isFollowing = user.follows.includes(id);
      if (isFollowing) {
        // Usuwanie obserwacji
        await User.findByIdAndUpdate(userId, {
          $pull: { follows: id },
        });
        await User.findByIdAndUpdate(id, {
          $pull: { followers: userId },
        });
        res.send({ followed: false });
      } else {
        // Dodawanie obserwacji
        await User.findByIdAndUpdate(userId, {
          $push: { follows: id },
        });
        await User.findByIdAndUpdate(id, {
          $push: { followers: userId },
        });
        res.send({ followed: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  // Pobieranie danych użytkownika na podstawie ID
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select(
        "-email -password"
      );

      res.send(user);
    } catch (err) {
      res.send(err);
    }
  },
  // Pobieranie obserwujących lub obserwowanych użytkowników
  getFollowsOrFollowers: async (req, res) => {
    try {
      let populateField;
      if (req.params.type == 0) {
        populateField = "follows";
      } else {
        populateField = "followers";
      }
      const users = await User.findById(req.params.id).populate({
        path: populateField,
        select: "_id name surname",
        options: { limit: +req.params.limit },
      });

      if (users[populateField].length > +req.params.limit - req.params.jump) {
        res.send({ success: true, users: users[populateField] });
      } else {
        res.send({ success: true, users: [] });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
};
export default userController;
