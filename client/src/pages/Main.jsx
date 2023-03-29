import "./style.css";
import { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import { findOwnerPosts } from "../api/post";
export default function Main() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    loadMore();
  }, []);
  const [hasMore, setHasMore] = useState(true);
  const loadMore = () => {
    findOwnerPosts(posts, setPosts, skip, setSkip, setHasMore);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <LinearProgress color="inherit" />
          </div>
        }
      >
        {posts.map((val) => (
          <div className="main-element" key={val.id}>
            <InfoCard desc={val.desc} />
          </div>
        ))}
      </InfiniteScroll>
      {!hasMore ? (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          There is nothing more
        </div>
      ) : null}{" "}
    </>
  );
}
