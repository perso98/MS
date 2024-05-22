import React, { useEffect, useState } from "react";
import { getPost } from "../api/post";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { CircularProgress } from "@mui/material";
function Post() {

  // Pobranie ID posta z parametrów URL
  const { id } = useParams();
  
  // Stan przechowujący dane posta
  const [posts, setPosts] = useState({ data: [] });

  // Stan do zarządzania otwarciem okna modalnego (jeśli dotyczy)
  const [open, setOpen] = useState(false);

  // Stan ładowania danych
  const [loading, setLoading] = useState(true);

  // Pobranie danych posta przy zmianie ID
  useEffect(() => {
    getPost(setPosts, id, setLoading);
  }, [id]);


  // Komponent wyświetlający stan ładowania lub dane posta
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
