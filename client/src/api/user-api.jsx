import axios from "axios";
const URL = "http://localhost:8080/api/v1";
const registerUserApi = async (data) => {
  console.log(data);
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios
    .post(`${URL}/user/register`, data, config)
    .then((res) => res)
    .catch((er) => er);
};

// login user
const loginUserApi = async (data) => {
  return axios
    .post(`${URL}/user/login`, data)
    .then((res) => res)
    .catch((er) => er);
};

export { registerUserApi, loginUserApi };
