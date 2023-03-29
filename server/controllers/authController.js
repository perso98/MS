import bcrypt from "bcrypt";
import User from "../models/User.js";

const authController = {
  //register user controller
  register: async (req, res) => {
    const { email, name, surname, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const createdUser = await User.create({
        email,
        name,
        surname,
        password: bcrypt.hashSync(password, 10),
      });
      res.send(createdUser);
    } else {
      res.send("User is already in database");
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.user = user;
        res.send(user);
      } else res.send("Login failed");
    } else res.send("User doesn't exist");
  },
  auth: async (req, res) => {
    if (req.session.user) res.send({ success: true, user: req.session.user });
    else res.send({ success: false });
  },
  logout: async (req, res) => {
    if (req.session.user) {
      req.session.destroy();
      res.send("Logout success");
    } else res.send("You are not logged in");
  },
};
export default authController;
