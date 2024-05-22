import axios from "axios";
import { fetchData } from "./fetchData";

// Funkcja do wyszukiwania użytkowników
export const searchUser = async (search, users, setUsers) => {
  await fetchData(`/user/${search}`, users, setUsers, "users", 5);
};

// Funkcja do obsługi obserwowania/odobserwowania użytkownika
export const followHandler = async (id, user, setUser, setFollowInfo) => {
  const res = await axios.post(`/user/follow`, { id });
     
  if (res.data.followed) {
     // Aktualizacja stanu użytkownika i informacji o obserwujących po dodaniu obserwowania
    setUser({ ...user, follows: [...user.follows, id] });
    setFollowInfo((prevFollowInfo) => ({
      ...prevFollowInfo,
      followers: [...prevFollowInfo.followers, user._id],
    }));
  } else {
    // Aktualizacja stanu użytkownika i informacji o obserwujących po usunięciu obserwowania
    setUser({
      ...user,
      follows: user.follows.filter((val) => val !== id),
    });
    setFollowInfo((prevFollowInfo) => ({
      ...prevFollowInfo,
      followers: prevFollowInfo.followers.filter((val) => val !== user._id),
    }));
  }
};

// Funkcja do pobierania danych użytkownika na podstawie ID
export const getUser = async (id, setProfile, setLoading) => {
  const res = await axios.get(`/user/get-user/${id}`);
  setProfile(res.data);
  setLoading(false); // Ustawienie stanu ładowania na false w przypadku błędu
};

// Funkcja do pobierania obserwujących lub obserwowanych użytkowników
export const getFollowersOrFollows = async (id, type, setFollow, follow) => {
  await fetchData(
    `/user/get-followers-or-follows/${type}/${id}`,
    follow,
    setFollow,
    "users",
    10
  );
};
