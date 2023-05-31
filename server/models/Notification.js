import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  followed: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likedPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  likedComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  addComment: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", NotificationSchema);
