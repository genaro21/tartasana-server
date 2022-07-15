const models = require("../models");
const fs = require("fs/promises");
const path = require("path");

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

const remove = async (req, res) => {
  try {
    const { cakeId } = req.body;

    const cake = await models.cake.findById(cakeId);
    if (!cake) {
      return res.json({ error: "La tarta en cuestión no existe" });
    }

    const imageSplit = cake.image.split("/");
    const fileName = imageSplit[imageSplit.length - 1];
    const imagePath = path.resolve("./src/statics/img/cake/" + fileName);
    console.log({ imagePath });

    fs.unlink(imagePath);

    await models.comment.deleteMany({ cake });
    const data = await models.cake.findByIdAndRemove(cakeId);

    return res.json({ data });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const like = async (req, res) => {
  try {
    const { cakeId } = req.body;

    const cake = await models.cake.findById(cakeId);
    if (!cake) {
      return res.json({ error: "La tarta no existe" });
    }
    cake.likes++;
    await cake.save();
    return res.json({ cake });
  } catch (err) {
    return res.json({ err: err.mesage });
  }
};

const view = async (req, res) => {
  try {
    const { cakeId } = req.body;
    console.log("cakeId: ", cakeId);

    const cake = await models.cake.findByIdAndUpdate(
      cakeId,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    console.log({ cake });
    return res.json({ cake });
  } catch (err) {
    return res.json({ err: err.mesage });
  }
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
