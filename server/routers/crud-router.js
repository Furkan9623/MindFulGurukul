const express = require("express");
const {
  addUserController,
  getAllUserController,
  deleteUserController,
} = require("../controllers/crud-user-controllers");
const crudRouter = express.Router();
// add user
crudRouter.post("/add-user", addUserController);
// all user
crudRouter.get("/all-user", getAllUserController);

// delete user
crudRouter.delete("/delete-user/:id", deleteUserController);

module.exports = crudRouter;
