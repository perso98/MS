import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Post", PostSchema);
