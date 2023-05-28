import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  desc: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", PostSchema);
