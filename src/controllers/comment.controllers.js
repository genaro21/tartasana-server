const models = require("../models");

const lastestComments = async (req, res) => {
  try {
    const uploads = await models.comment
      .find()
      .sort({ createdAt: "desc" })
      .limit(5);
    return res.json({ uploads });
  } catch (err) {
    return res.json({ msg: err.message });
  }
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
const remove = async (req, res) => {
  try {
    const { commentId } = req.body;
    const comment = await models.comment.findById(commentId);
    if (!comment) {
      return res.json("El comentario no existe");
    }
    const data = await models.comment.findByIdAndDelete(commentId);
    return res.json({ data });
  } catch (err) {
    res.json({ err: err.mesage });
  }
};

module.exports = {
  lastestComments,
  create,
  remove,
};
