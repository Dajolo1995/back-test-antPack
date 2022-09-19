const express = require("express");
const api = express.Router();

const {
  createData,
  getDataAll,
  getDataOneUser,
  getDataOneData
} = require("../../controller/data/dataController");

api.post(
  "/data",

  createData
);

api.get("/datas", getDataAll);

api.get("/data/:id", getDataOneData);

api.get("/datas/:userId", getDataOneUser);

module.exports = api;
