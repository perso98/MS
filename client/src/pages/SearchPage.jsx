import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchUser } from "../api/user";
import UserSearchCard from "../components/UserSearchCard";
import "./style.css";
function SearchPage() {
  const [data, setData] = useState([]);
  const { search } = useParams();
  useEffect(() => {
    searchUser(search, setData);
  }, [search]);
  return (
    <div className="user-card-wrapper">
      {" "}
      {data.map((val) => (
        <div key={val._id}>
          <UserSearchCard user={val} />
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
