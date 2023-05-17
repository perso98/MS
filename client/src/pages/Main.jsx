import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import { findFollowsPosts } from "../api/post";
import CircularProgress from "@mui/material/CircularProgress";
export default function Main() {
  const [posts, setPosts] = useState({
    data: [],
    hasMore: true,
    limit: 5,
  });
  const loadMore = () => {
    findFollowsPosts(posts, setPosts);
  };
  useEffect(() => {
    setPosts({ ...posts, loading: true });
    loadMore();
  }, []);
  return (
    <>
      {posts.loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <div>
          {posts?.data.length === 0 && !posts?.loading ? (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              Nothing found
            </div>
          ) : null}

          <InfiniteScroll
            dataLength={posts.data.length}
            next={loadMore}
            hasMore={posts.hasMore}
            loader={
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <LinearProgress color="inherit" />
              </div>
            }
          >
            {posts.data.map((val) => (
              <div className="main-element" key={val._id}>
                <PostCard val={val} setPosts={setPosts} />
              </div>
            ))}
          </InfiniteScroll>
          {!posts.hasMore && posts.data.length !== 0 ? (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              There is nothing more
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
