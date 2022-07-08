const bcrypt = require("bcrypt");

encrypt = async (password) => {
  return bcrypt.hash(password, 10);
};

compare = async (passwordPlane, passswordEncrypt) => {
  return bcrypt.compare(passwordPlane, passswordEncrypt);
};

module.exports = {
  encrypt,
  compare,
};
