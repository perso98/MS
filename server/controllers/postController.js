import Post from "../models/Post.js";
import User from "../models/User.js";
const postController = {
  createPost: async (req, res) => {
    try {
      const { subject, desc, category } = req.body;
      const post = await Post.create({ subject, desc, category });
      await User.findByIdAndUpdate(
        req.session.user._id,
        { $push: { posts: post._id } },
        { new: true }
      );
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
    }
  },
  findAllUserPosts: async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id).populate({
        path: "posts",
        options: {
          limit: 5,
          skip: req.params.skip,
        },
      });

      res.send({ success: true, posts: user.posts });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
};
export default postController;
