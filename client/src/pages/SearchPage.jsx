import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchUser } from "../api/user";
import InfoCard from "../components/InfoCard";
import "./style.css";
import UserSearchCard from "../components/UserSearchCard";
import Button from "@mui/material/Button";
import { searchPost } from "../api/post";
import LinearProgress from "@mui/material/LinearProgress";
import SearchData from "../components/SearchData";
function SearchPage() {
  const [users, setUsers] = useState({
    data: [],
    loading: true,
    skip: 0,
    hasMore: true,
  });
  const [posts, setPosts] = useState({
    data: [],
    loading: true,
    skip: 0,
    hasMore: true,
  });
  const [toggleSearch, setToggleSearch] = useState(true);
  const { search } = useParams();
  useEffect(() => {
    setUsers({ ...users, loading: true });
    setPosts({ ...posts, loading: true });
    searchUser(
      search,
      { loading: true, data: [], skip: 0, hasMore: true },
      setUsers
    );
    searchPost(
      search,
      { loading: true, data: [], skip: 0, hasMore: true },
      setPosts
    );
  }, [search]);

  const loadMoreUsers = () => {
    searchUser(search, users, setUsers);
  };
  const loadMorePosts = () => {
    searchPost(search, posts, setPosts);
  };
  return (
    <>
      <div className="search-page-buttons">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setToggleSearch(true);
          }}
          disabled={toggleSearch ? true : false}
        >
          Find users
        </Button>{" "}
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setToggleSearch(false);
          }}
          disabled={!toggleSearch ? true : false}
        >
          Find posts
        </Button>{" "}
      </div>
      {toggleSearch ? (
        <>
          {users.loading ? <LinearProgress color="inherit" /> : null}
          <SearchData
            array={users}
            loadMore={loadMoreUsers}
            component={UserSearchCard}
          />
        </>
      ) : (
        <>
          {posts.loading ? <LinearProgress color="inherit" /> : null}
          <SearchData
            array={posts}
            loadMore={loadMorePosts}
            component={InfoCard}
          />
        </>
      )}
    </>
  );
}

export default SearchPage;
