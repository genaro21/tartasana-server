const models = require("../models");
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await models.user.findOne({ email });
    if (!user) {
      return res.json({ err: "Usuario no encontrado" });
    }

    const isValid = await utils.bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({ err: "Password no encontrado" });
    }

    const token = jwt.sign({ user }, config.jwt.secret);

    return res.json({ token });
  } catch (err) {
    return res.json({ err: err.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;
    const hostname = "http://localhost:4500/";
    const hash = await utils.bcrypt.encrypt(password);
    const file = req.file;

    // if (!firstname || !lastname || !phone || !email || !password) {
    //   return res.json("Debes rellenar todos los campos");
    // }

    const user = {
      avatar: hostname + file.filename,
      firstName,
      lastName,
      phone,
      email,
      password: hash,
    };

    const data = await models.user.create(user);

    return res.status(201).json({ data });
  } catch (err) {
    return res.json({ err: err.mesage });
  }
};

module.exports = {
  signIn,
  signUp,
};
