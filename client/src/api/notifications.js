import axios from "axios";


 /* 
 Tutaj jeszcze nie skończone do końca
 */

// Funkcja do pobierania identyfikatorów powiadomień i aktualizacji stanu użytkownika
export const getNotificationsIds = async (setUser) => {
  try {
        // Wysłanie żądania GET do endpointu powiadomień
    await axios.get("/notifications/").then((res) => {
      // Aktualizacja stanu użytkownika z nowymi powiadomieniami
      setUser((user) => ({ ...user, notifications: res.data }));
    });
  } catch (err) {
    console.log(err);
  }
};
// Funkcja do pobierania pełnych danych powiadomień i aktualizacji stanu powiadomień
export const getNotifications = async (setNotifications, setLoading) => {
  try {
    // Wysłanie żądania GET do endpointu pełnych powiadomień
    await axios.get("/notifications/full/notifications").then((res) => {
       // Aktualizacja stanu powiadomień z danymi z odpowiedzi
      setNotifications(res.data);
      setLoading(false);
    });
  } catch (err) {
    console.log(err);
  }
};
