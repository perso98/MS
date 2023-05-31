import React, { useEffect, useState } from "react";
import { getPost } from "../api/post";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
function Post() {
  const { id } = useParams();
  const [posts, setPosts] = useState({ data: [] });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getPost(setPosts, id);
  }, [id]);
  return (
    <>
      {posts.data.length !== 0 ? (
        <>
          {console.log(posts)}
          <PostCard
            val={posts.data[0]}
            setArray={setPosts}
            setOpen={setOpen}
            open={open}
          />
        </>
      ) : null}
    </>
  );
}

export default Post;
