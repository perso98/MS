import React, { useEffect, useState } from "react";
import { getPost } from "../api/post";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    getPost(setPost, id);
  }, [id]);
  return <>{post ? <PostCard val={post} /> : null}</>;
}

export default Post;
