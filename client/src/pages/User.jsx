import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import { findOwnerPosts } from "../api/post";
import AddPost from "../components/AddPost";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import UserCard from "../components/UserCard";
import { getUser } from "../api/user";
import CircularProgress from "@mui/material/CircularProgress";
export default function User() {

  // Stan dla postów użytkownika
  const [posts, setPosts] = useState({
    data: [],
    hasMore: true,
    limit: 5,
    loading: true,
  });

  // Stan dla profilu użytkownika
  const [profile, setProfile] = useState();

  // Stan dla ładowania danych
  const [loading, setLoading] = useState(true);

  // Pobranie zalogowanego użytkownika z kontekstu uwierzytelniania
  const { user } = useContext(AuthContext);

  // Stan dla sprawdzenia, czy początkowe ładowanie jest zakończone
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Pobranie ID użytkownika z parametrów URL
  const { id } = useParams();

  // Funkcja do ładowania większej ilości postów
  const loadMore = () => {
    findOwnerPosts(posts, setPosts, id);
  };

  // Efekt do resetowania stanu i ładowania profilu użytkownika przy zmianie ID
  useEffect(() => {
    setPosts({ data: [], hasMore: true, limit: 5, loading: true });
    setLoading(true);
    getUser(id, setProfile, setLoading);
    setInitialLoadComplete(false);
  }, [id]);

   // Efekt do ładowania postów po zakończeniu początkowego ładowania
  useEffect(() => {
    if (initialLoadComplete) {
      loadMore();
    } else {
      setInitialLoadComplete(true);
    }
  }, [initialLoadComplete]);
  return (
    <>
      {loading && posts.loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          {profile ? <UserCard val={profile} /> : null}
          {id === user._id ? (
            <AddPost posts={posts} setPosts={setPosts} />
          ) : null}
          {posts.data?.length === 0 && !posts.loading ? (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              This user doesn't have any posts.
            </div>
          ) : null}
          <InfiniteScroll
            dataLength={posts.data?.length}
            next={loadMore}
            hasMore={posts.hasMore}
            loader={
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <LinearProgress color="inherit" />
              </div>
            }
          >
            {posts.data?.map((val) => (
              <div className="main-element" key={val._id}>
                <PostCard key={val._id} val={val} setArray={setPosts} />
              </div>
            ))}
          </InfiniteScroll>
          {!posts.hasMore && posts.data?.length !== 0 ? (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              There is nothing more
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
