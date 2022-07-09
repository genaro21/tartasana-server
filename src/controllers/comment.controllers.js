const models = require("../models");

const lastestComments = (req, res) => {
  return res.json("lastest comments");
};
const create = async (req, res) => {
  try {
    const { title, description, userId, cakeId } = req.body;

    const user = await models.user.findById(userId);
    if (!user) {
      return res.json("El usuario no existe");
    }
    const cake = await models.cake.findById(cakeId);
    if (!cake) {
      return res.json("La tarta no existe");
    }

    const comment = await models.comment.create({
      title,
      description,
      user,
      cake,
    });
    return res.json({ comment });
  } catch (err) {
    res.json({ err: err.mesage });
  }
};

module.exports = {
  lastestComments,
  create,
};
