import React, { useEffect, useState } from "react";
import { getPost } from "../api/post";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { CircularProgress } from "@mui/material";
function Post() {
  const { id } = useParams();
  const [posts, setPosts] = useState({ data: [] });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPost(setPosts, id, setLoading);
  }, [id]);

  const LoadingPost = () => {
    return loading ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="inherit" />
      </div>
    ) : (
      <PostCard
        val={posts.data[0]}
        setArray={setPosts}
        setOpen={setOpen}
        open={open}
      />
    );
  };

  return (
    <>
      <LoadingPost />
    </>
  );
}

export default Post;
