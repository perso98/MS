import axios from "axios";

export const searchUser = async (search, setData) => {
  const res = await axios.get(`/user/${search}`);
  const filteredData = res.data.filter(
    (val) =>
      val.name.toLowerCase().includes(search.toLowerCase()) ||
      val.surname.toLowerCase().includes(search.toLowerCase())
  );

  setData(filteredData);
};
