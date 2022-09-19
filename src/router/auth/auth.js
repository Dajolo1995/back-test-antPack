const express = require("express");
const api = express.Router();

const { authUser } = require("../../controller/auth/authController");

api.post("/auth",authUser );

module.exports = api;
