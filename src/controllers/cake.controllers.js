const models = require("../models");

const upload = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    console.log({ title, category, description });
    const file = req.file;
    console.log({ file });

    const cake = await models.cake.create({
      image: file.filename,
      title,
      category,
      description,
    });
    return res.json({ cake });
  } catch (err) {
    return res.json({ err: err.mesage });
  }
};
const recentUpload = (req, res) => {
  return res.json("Recent Upload");
};
const stats = (req, res) => {
  return res.json("Stats");
};
const mostPopular = (req, res) => {
  return res.json("Most popular");
};
const details = (req, res) => {
  return res.json("Details");
};
const remove = (req, res) => {
  return res.json("delete cake");
};
const like = (req, res) => {
  return res.json("like cake");
};
const view = (req, res) => {
  return res.json("view cake");
};

module.exports = {
  upload,
  recentUpload,
  stats,
  mostPopular,
  details,
  remove,
  like,
  view,
};
