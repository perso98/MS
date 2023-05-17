import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchUser } from "../api/user";
import PostCard from "../components/PostCard";
import UserCard from "../components/UserCard";
import Button from "@mui/material/Button";
import { searchPost } from "../api/post";
import LinearProgress from "@mui/material/LinearProgress";
import SearchData from "../components/SearchData";
function SearchPage() {
  const [users, setUsers] = useState({
    data: [],
    loading: true,
    limit: 5,
    hasMore: true,
  });
  const [posts, setPosts] = useState({
    data: [],
    loading: true,
    limit: 5,
    hasMore: true,
  });
  const [toggleSearch, setToggleSearch] = useState(true);
  const { search } = useParams();
  useEffect(() => {
    setUsers({ ...users, loading: true, hasMore: true });
    setPosts({ ...posts, loading: true, hasMore: true });
    searchUser(
      search,
      { loading: true, data: [], limit: 5, hasMore: true },
      setUsers
    );
    searchPost(
      search,
      { loading: true, data: [], limit: 5, hasMore: true },
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
          Users
        </Button>{" "}
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setToggleSearch(false);
          }}
          disabled={!toggleSearch ? true : false}
        >
          Posts
        </Button>{" "}
      </div>
      {toggleSearch ? (
        <>
          {users.loading ? <LinearProgress color="inherit" /> : null}
          <SearchData
            array={users}
            setArray={setUsers}
            loadMore={loadMoreUsers}
            component={UserCard}
          />
        </>
      ) : (
        <>
          {posts.loading ? <LinearProgress color="inherit" /> : null}
          <SearchData
            array={posts}
            setArray={setPosts}
            loadMore={loadMorePosts}
            component={PostCard}
          />
        </>
      )}
    </>
  );
}

export default SearchPage;
