import Post from "../models/Post.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
const postController = {
  createPost: async (req, res) => {
    try {
      const { subject, desc, category } = req.body;

      const post = await Post.create({
        subject,
        desc,
        category,
        user: req.session.user._id,
      });
      await User.findByIdAndUpdate(
        req.session.user._id,
        { $push: { posts: post._id } },
        { new: true }
      );
      const newPost = await Post.findById(post._id).populate(
        "user",
        "_id name surname"
      );

      res.send({ success: true, post: newPost });
    } catch (err) {
      console.log(err);
      res.send({ success: false });
    }
  },
  userPosts: async (req, res) => {
    try {
      const posts = await Post.find({
        user: req.params.id,
      })
        .sort({ createdAt: -1 })
        .limit(req.params.limit)
        .populate("user", "_id name surname");

      if (posts.length > +req.params.limit - req.params.jump) {
        res.send({ success: true, posts: posts });
      } else {
        res.send({ success: true, posts: [] });
      }
    } catch (err) {
      res.send(err);
    }
  },
  findPost: async (req, res) => {
    const search = req.params.search;

    const posts = await Post.find({
      $or: [
        { subject: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(req.params.limit)
      .populate("user", "_id name surname");

    if (posts.length > +req.params.limit - req.params.jump) {
      res.send({ success: true, posts: posts });
    } else {
      res.send({ success: true, posts: [] });
    }
  },
  post: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate(
        "user",
        "_id name surname"
      );

      res.send(post);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  like: async (req, res) => {
    try {
      const post = await Post.findById(req.body.id);

      if (!post.likes.includes(req.session.user._id)) {
        const notification = await Notification.create({
          user: req.session.user._id,
          action: "likedPost",
          likedPost: post._id,
        });
        await User.findByIdAndUpdate(post.user._id, {
          $push: { notifications: notification._id },
        });

        await post.updateOne({ $push: { likes: req.session.user._id } });
        res.send({ like: true });
      } else {
        await post.updateOne({ $pull: { likes: req.session.user._id } });

        res.send({ like: false });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  updatePost: async (req, res) => {
    try {
      const { subject, desc, id } = req.body;
      await Post.findByIdAndUpdate(id, {
        desc,
        subject,
      });
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
    }
  },
  deletePost: async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);
      await Post.findByIdAndDelete(req.params.id);
      await user.updateOne({ $pull: { posts: req.params.id } });
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
    }
  },
  followsPosts: async (req, res) => {
    const users = await User.findById(req.session.user._id).select("follows");
    const posts = await Post.find({ user: { $in: users.follows } })
      .sort({ createdAt: -1 })
      .limit(req.params.limit)
      .populate("user", "_id name surname");
    if (posts.length > +req.params.limit - req.params.jump) {
      res.send({ success: true, posts: posts });
    } else {
      res.send({ success: true, posts: [] });
    }
  },
};
export default postController;
