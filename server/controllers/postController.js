import Post from "../models/Post.js";
import User from "../models/User.js";
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
  posts: async (req, res) => {
    try {
      let lastPostFetchTime = req.session.lastPostFetchTime;
      if (!lastPostFetchTime || req.params.skip == 0) {
        lastPostFetchTime = new Date();
        req.session.lastPostFetchTime = lastPostFetchTime;
      }

      const posts = await Post.find({
        user: req.params.id,
        createdAt: { $lt: lastPostFetchTime },
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .skip(req.params.skip)
        .populate("user", "_id name surname");

      res.send({ success: true, posts: posts });
    } catch (err) {
      res.send(err);
    }
  },
  findPost: async (req, res) => {
    const search = req.params.search;
    if (req.params.skip == 0) {
      req.session.lastPostSearch = new Date();
    }
    const posts = await Post.find({
      createdAt: { $lt: req.session.lastPostSearch },
      $or: [
        { subject: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ],
    })
      .skip(req.params.skip)
      .limit(5)
      .populate("user", "_id name surname");

    res.send(posts);
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
        await post.updateOne({ $push: { likes: req.session.user._id } });
        res.send({ like: true });
      } else {
        await post.updateOne({ $pull: { likes: req.session.user._id } });

        res.send({ like: false });
      }
    } catch (err) {
      res.send(err);
    }
  },
  updatePost: async (req, res) => {
    try {
      const { subject, category, desc, id } = req.body;
      await Post.findByIdAndUpdate(id, {
        category,
        desc,
        subject,
      });
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
    }
  },
};
export default postController;
