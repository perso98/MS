import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
const commentController = {
  getComments: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate({
          path: "comments",
          populate: { path: "user" },
          options: { sort: { createdAt: -1 } },
        })

        .limit(req.params.limit);

      if (post.comments.length > +req.params.limit - req.params.jump) {
        res.send({ success: true, comments: post.comments });
      } else {
        res.send({ success: true, comments: [] });
      }
    } catch (err) {
      res.send({ success: false });
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    const { text, postId, userId } = req.body;
    try {
      const newComment = await Comment.create({
        text,
        user: userId,
      });
      const post = await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
      const notification = await Notification.create({
        user: req.session.user._id,
        action: "addComment",
        addComment: post._id,
      });
      const postFinder = await Post.findById(postId).populate("user");
      await User.findByIdAndUpdate(postFinder.user._id, {
        $push: { notifications: notification._id },
      });
      res.send({
        success: true,
        commentId: newComment._id,
        createdAt: newComment.createdAt,
      });
    } catch (err) {
      res.send({ success: false, message: err.message });
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    const { commentId, postId } = req.params;
    try {
      const post = await Post.findById(postId);
      await post.updateOne({ $pull: { comments: commentId } });
      await Comment.findByIdAndDelete(commentId);
      res.send({ success: true });
    } catch (err) {
      res.send({ success: false });
    }
  },
  like: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment.likes.includes(req.session.user._id)) {
        await comment.updateOne({ $push: { likes: req.session.user._id } });
        res.send({ like: true });
      } else {
        await comment.updateOne({ $pull: { likes: req.session.user._id } });
        res.send({ like: false });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
};
export default commentController;
