import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../providers/AuthProvider";
export default function AddPost(props) {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setPosts([...props.posts, { ...post, createdAt: Date.now() }]);
  };
  return (
    <div className="post-container">
      <h2>Add your post below</h2>
      <form onSubmit={handleSubmit}>
        <div className="post-element-container">
          <label>Title</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div className="post-element-container">
          <label>Description</label>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
        </div>
        <div className="post-element-container">
          <label>Category</label>
          <input
            type="text"
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          />
        </div>
        {post.title && post.description && post.category ? (
          <Button type="submit" variant="contained" color="success">
            Add Post
          </Button>
        ) : (
          <Button disabled={true} variant="contained" color="success">
            Add Post
          </Button>
        )}
      </form>
    </div>
  );
}
