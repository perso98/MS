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
