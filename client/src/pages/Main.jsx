import "./style.css";
import { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import { findOwnerPosts } from "../api/post";
import AddPost from "../components/AddPost";
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
      <AddPost
        posts={posts}
        setPosts={setPosts}
        setSkip={setSkip}
        skip={skip}
      />
      {posts.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          You can add your first post above
        </div>
      ) : null}
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
          <div className="main-element" key={val._id}>
            {console.log(val)}
            <InfoCard
              desc={val.desc}
              createdAt={val.createdAt}
              subject={val.subject}
              category={val.category}
            />
          </div>
        ))}
      </InfiniteScroll>
      {!hasMore && posts.length !== 0 ? (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          There is nothing more
        </div>
      ) : null}{" "}
    </>
  );
}
