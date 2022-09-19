const express = require("express");
const api = express.Router();

const {
  createUser,
  getUsers,
  getUsersId,
  updateUser,
  updateUserPassword,
} = require("../../controller/user/userController.js");

api.post(
  "/user",

  createUser
);

api.get("/users", getUsers);

api.get("/user/:id", getUsersId);

api.put("/user/:id", updateUser);

api.put("/user-password", updateUserPassword);

module.exports = api;
