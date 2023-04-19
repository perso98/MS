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
      res.send({ success: true, post: post });
    } catch (err) {
      res.send({ success: false });
    }
  },
  findAllUserPosts: async (req, res) => {
    if (req.params.skip == 0) {
      req.session.lastPostFetchTime = new Date();
    }
    try {
      const user = await User.findById(req.session.user._id)
        .populate({
          path: "posts",
          match: { createdAt: { $lt: req.session.lastPostFetchTime } },
          options: {
            limit: 5,
            skip: req.params.skip,
            sort: { createdAt: -1 },
          },
        })
        .select("-user");

      res.send({ success: true, userId: user._id, posts: user.posts });
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
};
export default postController;
