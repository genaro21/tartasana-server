const models = require("../models");

const upload = (req, res) => {
  return res.json("Upload");
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

module.exports = {
  upload,
  recentUpload,
  stats,
  mostPopular,
  details,
  remove,
  like,
};
