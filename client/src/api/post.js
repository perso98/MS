import axios from "axios";

export const findOwnerPosts = async () => {
  await axios
    .get("/post/find-all-user-posts")
    .then((res) => console.log(res.data));
};
