import React, { useEffect, useState } from "react";
import { getPost } from "../api/post";
import { useParams } from "react-router-dom";
import InfoCard from "../components/InfoCard";
function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    getPost(setPost, id);
  }, [id]);
  return <>{post ? <InfoCard val={post} /> : null}</>;
}

export default Post;
