import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { createPost } from "../api/post";
import { AuthContext } from "../providers/AuthProvider";
export default function AddPost(props) {
  const { setUser } = useContext(AuthContext);
  const [post, setPost] = useState({
    subject: "",
    desc: "",
    category: "",
  });

  return (
    <div className="post-container">
      <h2>Add your post below</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost(post, props.setPosts, setUser);
        }}
      >
        <div className="post-element-container">
          <label>Subject</label>
          <input
            required
            type="text"
            value={post.subject}
            onChange={(e) => setPost({ ...post, subject: e.target.value })}
          />
        </div>

        <div className="post-element-container">
          <label>Description</label>
          <textarea
            required
            value={post.desc}
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
          />
        </div>
        <div className="post-element-container">
          <label>Category</label>
          <input
            required
            type="text"
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          />
        </div>

        <Button type="submit" variant="contained" color="success">
          Add Post
        </Button>
      </form>
    </div>
  );
}
