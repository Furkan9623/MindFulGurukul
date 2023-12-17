const express = require("express");
const {
  addUserController,
  getAllUserController,
} = require("../controllers/crud-user-controllers");
const crudRouter = express.Router();
// add user
crudRouter.post("/add-user", addUserController);
// all user
crudRouter.get("/all-user", getAllUserController);

module.exports = crudRouter;
