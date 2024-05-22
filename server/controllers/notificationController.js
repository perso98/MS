import User from "../models/User.js";
const notificationController = {
    // Funkcja do pobierania nowych powiadomień użytkownika
  newNotifications: async (req, res) => {
    try {
      // Znajdź użytkownika na podstawie ID sesji
      const user = await User.findById(req.session.user._id);
      // Zwróć powiadomienia użytkownika
      res.send(user.notifications);
    } catch (err) {
      // Wyślij błąd
      res.send(err);
    }
  },
    // Funkcja do pobierania wszystkich powiadomień użytkownika z dodatkowymi danymi
  notifications: async (req, res) => {
    try {
       // Znajdź użytkownika na podstawie ID sesji i zagnieżdżone pobierz powiadomienia wraz z użytkownikiem
      const user = await User.findById(req.session.user._id).populate({
        path: "notifications",
        populate: {
          path: "user",
          select: "-password -posts -notifications",
        },
      });
      // Zwróć powiadomienia użytkownika
      res.send(user.notifications);
    } catch (err) {
      // Wyślij błąd
      res.send(err);
    }
  },
};
export default notificationController;
