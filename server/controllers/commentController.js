import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
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
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
      console.log(newComment);
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
};
export default commentController;
