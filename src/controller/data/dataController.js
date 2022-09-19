const Data = require("../../models/dataModels");
const User = require("../../models/Users");
const { validationResult } = require("express-validator");

const createData = async (req, res) => {
  try {
    const data = new Data(req.body);

    await data.save();

    res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server internal error");
  }
};

const getDataAll = async (req, res) => {
  try {
    const data = await Data.find();

    res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server internal error");
  }
};

const getDataOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await Data.find({userId});

    const user = await User.findOne({ userId });

    const response = {
      data,
      user,
    };

    res.json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server internal error");
  }
};

const getDataOneData = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Data.findOne({ id });

    const user_id = data.userId;

    const user = await User.findOne({ user_id });

    const response = {
      data,
      user,
    };

    res.json( [response] );
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server internal error");
  }
};

module.exports = {
  createData,
  getDataAll,
  getDataOneUser,
  getDataOneData,
};
