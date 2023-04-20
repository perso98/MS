import axios from "axios";
export const searchUser = async (search, users, setUsers) => {
  const res = await axios.get(`/user/${search}/${users.skip}`);
  setUsers({
    ...users,
    data: [...users.data, ...res.data],
    hasMore: res.data.length !== 0,
    skip: users.skip + 5,
    loading: users.loading ? false : null,
  });
};

export const followHandler = async (id, user, setUser, setArray) => {
  const res = await axios.post(`/user/follow`, { id });
  if (res.data.followed) {
    setUser({ ...user, follows: [...user.follows, id] });
    setArray((prevState) => ({
      ...prevState,
      data: prevState.data.map((val) => {
        if (val._id === user._id) {
          return {
            ...val,
            follows: [...val.follows, id],
          };
        } else if (val._id === id) {
          return {
            ...val,
            followers: [...val.followers, user._id],
          };
        } else {
          return val;
        }
      }),
    }));
  } else {
    setUser({
      ...user,
      follows: user.follows.filter((val) => val !== id),
    });
    setArray((prevState) => ({
      ...prevState,
      data: prevState.data.map((val) => {
        if (val._id === user._id) {
          return {
            ...val,
            follows: val.follows.filter((follows) => follows !== id),
          };
        } else if (val._id === id) {
          return {
            ...val,
            followers: val.followers.filter(
              (followers) => followers !== user._id
            ),
          };
        } else {
          return val;
        }
      }),
    }));
  }
};
