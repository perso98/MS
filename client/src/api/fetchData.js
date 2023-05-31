import axios from "axios";
export const fetchData = async (endpoint, items, setItems, itemsKey, jump) => {
  try {
    await axios.get(`${endpoint}/${items.limit}/${jump}`).then((res) => {
      const newItems = res.data[itemsKey].filter((item) => {
        return !items.data.some(
          (existingItem) => existingItem._id === item._id
        );
      });
      const updatedItems = items.data.filter((existingItem) => {
        return res.data[itemsKey].some((item) => item._id === existingItem._id);
      });
      if (res.data[itemsKey].length < items.limit) {
        console.log(res.data[itemsKey].length, items.limit);
        setItems({
          ...items,
          hasMore: false,
          data: [...updatedItems, ...newItems],
          loading: false,
        });
      } else if (newItems.length > 0) {
        console.log(res.data[itemsKey].length, items.limit);

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
