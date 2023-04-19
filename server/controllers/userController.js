import bcrypt from "bcrypt";
import User from "../models/User.js";

const userController = {
  //register user controller
  register: async (req, res) => {
    const { email, name, surname, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        name,
        surname,
        password: hashedPassword,
      });
      res.send({ message: "Account created", success: true });
    } else {
      res.send({ message: "E-mail is already in database", success: false });
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
        res.send({ user: user, success: true });
      } else res.send({ message: "Password isn't correct", success: false });
    } else res.send({ message: "User doesn't exist", success: false });
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
  users: async (req, res) => {
    if (req.params.skip == 0) {
      req.session.lastUserSearch = new Date();
    }
    const search = req.params.search;
    const users = await User.find({
      createdAt: { $lt: req.session.lastUserSearch },
      $or: [
        { name: { $regex: search, $options: "i" } },
        { surname: { $regex: search, $options: "i" } },
      ],
    })
      .skip(req.params.skip)
      .limit(5)
      .select("-password");
    res.send(users);
  },
};
export default userController;
