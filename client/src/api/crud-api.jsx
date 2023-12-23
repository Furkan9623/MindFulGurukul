import axios from "axios";

const addUserApi = async (data) => {
  return axios
    .post(`/api/v1/crud-user/add-user`, data)
    .then((res) => res)
    .catch((er) => er);
};

const getAllUerApi = async (query, searchField, filter) => {
  console.log("searchField", searchField);
  let customUrl;
  if (searchField === "name") {
    customUrl = `/api/v1/crud-user/all-user?name=${query}&filter=${filter}`;
  } else if (searchField === "phone" || filter) {
    customUrl = `/api/v1/crud-user/all-user?phone=${query}&filter=${filter}`;
  } else if (searchField === "email" || filter) {
    customUrl = `/api/v1/crud-user/all-user?email=${query}&filter=${filter}`;
  } else if (filter) {
    customUrl = `/api/v1/crud-user/all-user?filter=${filter}`;
  } else {
    customUrl = `/api/v1/crud-user/all-user`;
  }
  return axios
    .get(customUrl)
    .then((res) => res)
    .catch((er) => er);
};

const deleteUserApi = async (id) => {
  return axios
    .delete(`/api/v1/crud-user/delete-user/${id}`)
    .then((res) => res)
    .catch((er) => er);
};

// single user
const singleUserApi = async (id) => {
  return axios
    .get(`/api/v1/crud-user/single-user/${id}`)
    .then((res) => res)
    .catch((er) => er);
};
// update user
const updateUserApi = async (id, data) => {
  return axios
    .patch(`/api/v1/crud-user/update-user/${id}`, data)
    .then((res) => res)
    .catch((er) => er);
};
export {
  addUserApi,
  getAllUerApi,
  deleteUserApi,
  singleUserApi,
  updateUserApi,
};
