const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { email, password, nickName } = req.body;
  try {
    console.log(email);

    const userEmail = await User.findOne({ email });

    console.log(userEmail);

    const userNickName = await User.findOne({ email });

    if (userEmail) {
      return res.status(403).json({ msg: "This email is not available" });
    }

    if (userNickName) {
      return res.status(403).json({ msg: "Username already exist!" });
    }

    //Creando el nuevo usuarioz
    let user = new User(req.body);

    //Hashear el password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmacion
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server internal error");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server internal error");
  }
};

const getUsersId = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).send("user not found");
    }

    res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server internal error");
  }
};

const updateUser = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const id = req.params.id;
    let user = await User.findOne({ id });

    user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server internal error");
  }
};

const updateUserPassword = async (req, res) => {
  const { password, id } = req.body;
  const newUser = {};

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  newUser.recoveryPasswordNumber = Math.E;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }

    user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: newUser },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Ha ocurrido un error al cambiar tu contraseña." });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUsersId,
  updateUser,
  updateUserPassword,
};
