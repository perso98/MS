import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchUser } from "../api/user";
import InfoCard from "../components/InfoCard";
import "./style.css";
import UserSearchCard from "../components/UserSearchCard";
import Button from "@mui/material/Button";

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
    setUsers({ ...users, skip: 0 });
    searchUser(search, users, setUsers);
  }, [search]);
  const loadMoreUsers = () => {
    searchUser(search, users, setUsers);
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
        <div className="user-card-wrapper">
          <SearchData
            array={users}
            loadMore={loadMoreUsers}
            component={UserSearchCard}
          />
        </div>
      ) : (
        <SearchData
          array={posts}
          loadMore={loadMoreUsers}
          component={InfoCard}
        />
      )}
    </>
  );
}

export default SearchPage;
