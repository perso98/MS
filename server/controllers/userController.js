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
  findUser: async (req, res) => {
    try {
      const search = req.params.search;
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { surname: { $regex: search, $options: "i" } },
        ],
      })
        .limit(+req.params.limit)
        .select("-password");
      if (users.length > +req.params.limit - 10) {
        res.send({ success: true, users: users });
      } else {
        res.send({ success: true, users: [] });
      }
    } catch (error) {
      console.error(error);
    }
  },
  follow: async (req, res) => {
    const { id } = req.body;
    const userId = req.session.user._id;
    try {
      const user = await User.findByIdAndUpdate(userId);
      const isFollowing = user.follows.includes(id);
      if (isFollowing) {
        await User.findByIdAndUpdate(userId, {
          $pull: { follows: id },
        });
        await User.findByIdAndUpdate(id, {
          $pull: { followers: userId },
        });
        res.send({ followed: false });
      } else {
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

      if (users[populateField].length > +req.params.limit - 5) {
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
