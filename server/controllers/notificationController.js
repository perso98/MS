import User from "../models/User.js";
const notificationController = {
  newNotifications: async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);
      res.send(user.notifications);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  notifications: async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id).populate(
        "notifications"
      );

      res.send(user.notifications);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
};
export default notificationController;
