import axios from "axios";
import { fetchData } from "./fetchData";
export const searchUser = async (search, users, setUsers) => {
  await fetchData(`/user/${search}`, users, setUsers, "users");
};

export const followHandler = async (id, user, setUser, setFollowInfo) => {
  const res = await axios.post(`/user/follow`, { id });
  if (res.data.followed) {
    setUser({ ...user, follows: [...user.follows, id] });
    setFollowInfo((prevFollowInfo) => ({
      ...prevFollowInfo,
      followers: [...prevFollowInfo.followers, user._id],
    }));
  } else {
    setUser({
      ...user,
      follows: user.follows.filter((val) => val !== id),
    });
    setFollowInfo((prevFollowInfo) => ({
      ...prevFollowInfo,
      followers: prevFollowInfo.followers.filter((val) => val !== user._id),
    }));
  }
};

export const getUser = async (id, setProfile, setLoading) => {
  const res = await axios.get(`/user/get-user/${id}`);
  setProfile(res.data);
  setLoading(false);
};

export const getFollowersOrFollows = async (id, type, setFollow, follow) => {
  const res = await axios.get(
    `/user/get-followers-or-follows/${type}/${id}/${follow.skip}`
  );

  setFollow({
    ...follow,
    users: [...follow.users, ...res.data],
    loading: false,
    skip: follow.skip + 10,
  });
};
