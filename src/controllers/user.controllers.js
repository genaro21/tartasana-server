const models = require("../models");
const utils = require("../utils");

const signIn = (req, res) => {
  return res.json("SignIn Ole");
};
const signUp = async (req, res) => {
  try {
    const { firstname, lastname, phone, email, password } = req.body;
    const file = req.file;
    console.log({ file });
    return res.json({ msg: "User crested" });

    // const hash = await utils.bcrypt.encrypt(password);

    // const user = {
    //   avatar: "avatar",
    //   firstname,
    //   lastname,
    //   phone,
    //   email,
    //   password: hash,
    // };

    // const data = await models.user.create(user);

    // return res.status(201).json({ data });
  } catch (err) {
    return res.json({ err });
  }
};

module.exports = {
  signIn,
  signUp,
};
