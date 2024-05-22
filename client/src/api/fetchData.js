import axios from "axios";
// Funkcja do pobierania danych z serwera i aktualizacji stanu elementów
export const fetchData = async (endpoint, items, setItems, itemsKey, jump) => {
  try {
    // Wysłanie żądania GET do określonego endpointu z limitami i skokiem
    await axios.get(`${endpoint}/${items.limit}/${jump + 1}`).then((res) => {
      // Filtracja nowych elementów, aby uniknąć duplikatów
      const newItems = res.data[itemsKey].filter((item) => {
        return !items.data.some(
          (existingItem) => existingItem._id === item._id
        );
      });
      // Filtracja istniejących elementów, które są również w odpowiedzi serwera
      const updatedItems = items.data.filter((existingItem) => {
        return res.data[itemsKey].some((item) => item._id === existingItem._id);
      });
      // Aktualizacja stanu na podstawie odpowiedzi serwera
      if (res.data[itemsKey].length < items.limit) {
        setItems({
          ...items,
          hasMore: false,
          data: [...updatedItems, ...newItems],
          loading: false,
        });
      } else if (newItems.length > 0) {

        setItems({
          ...items,
          limit: items.limit + jump,
          data: [...updatedItems, ...newItems],
          loading: false,
        });
      } else {
        setItems({
          ...items,
          hasMore: res.data[itemsKey].length !== 0,
          loading: false,
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
};
