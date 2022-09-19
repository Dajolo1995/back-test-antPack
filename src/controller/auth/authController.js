const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const authUser = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) {
      return res.status(401).json({ msg: "Incorrect password!" });
    }
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
        res.json({ token: token, user: user });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authUser,
};
