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
import EditPost from "../components/EditPost";
export default function User() {
  const [posts, setPosts] = useState({
    data: [],
    hasMore: true,
    limit: 5,
    loading: true,
  });
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [post, setPost] = useState({});
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const { id } = useParams();
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const loadMore = () => {
    findOwnerPosts(posts, setPosts, id);
  };

  useEffect(() => {
    setPosts({ data: [], hasMore: true, limit: 5, loading: true });
    setLoading(true);
    getUser(id, setProfile, setLoading);
    setInitialLoadComplete(false);
  }, [id]);
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
                <PostCard
                  key={val._id}
                  val={val}
                  setPost={setPost}
                  setOpen={setOpenEdit}
                  setPosts={setPosts}
                />
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
      <EditPost
        handleClose={handleCloseEdit}
        open={openEdit}
        post={post}
        setPost={setPost}
        setPosts={setPosts}
        user={user}
      />
    </>
  );
}
