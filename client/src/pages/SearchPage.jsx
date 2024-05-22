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

  // Stany dla wyników wyszukiwania użytkowników i postów
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

  // Przełącznik między wyszukiwaniem użytkowników a postów
  const [toggleSearch, setToggleSearch] = useState(true);

  // Pobranie parametru wyszukiwania z URL
  const { search } = useParams();

  // Wykonanie wyszukiwania przy zmianie parametru wyszukiwania
  useEffect(() => {
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


  // Funkcja do ładowania kolejnych wyników użytkowników
  const loadMoreUsers = () => {
    searchUser(search, users, setUsers);
  };

  // Funkcja do ładowania kolejnych wyników postów
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
