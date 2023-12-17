import axios from "axios";
const URL = "http://localhost:8080/api/v1";
const addUserApi = async (data) => {
  return axios
    .post(`${URL}/crud-user/add-user`, data)
    .then((res) => res)
    .catch((er) => er);
};
const getAllUerApi = async () => {
  return axios
    .get(`${URL}/crud-user/all-user`)
    .then((res) => res)
    .catch((er) => er);
};
export { addUserApi, getAllUerApi };
