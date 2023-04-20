import "./style.css";
import { useContext, useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import { findOwnerPosts } from "../api/post";
import AddPost from "../components/AddPost";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
export default function User() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const loadMore = () => {
    findOwnerPosts(skip, setSkip, setHasMore, posts, setPosts, id);
  };

  useEffect(() => {
    loadMore();
  }, []);
  return (
    <>
      {id === user._id ? (
        <AddPost
          posts={posts}
          setPosts={setPosts}
          setSkip={setSkip}
          skip={skip}
        />
      ) : null}
      {posts.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          Nothing found
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
            <InfoCard val={val} />
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
