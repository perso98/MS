import axios from "axios";
export const getNotificationsIds = async (setUser) => {
  try {
    await axios.get("/notifications/").then((res) => {
      setUser((user) => ({ ...user, notifications: res.data }));
    });
  } catch (err) {
    console.log(err);
  }
};
export const getNotifications = async (setNotifications, setLoading) => {
  try {
    await axios.get("/notifications/full/notifications").then((res) => {
      setNotifications(res.data);
      setLoading(false);
    });
  } catch (err) {
    console.log(err);
  }
};
