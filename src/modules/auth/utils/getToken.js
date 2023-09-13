import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = token;
  return token;
};

export default getToken;
