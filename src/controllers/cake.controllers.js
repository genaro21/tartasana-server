const models = require("../models");
const fs = require("fs/promises");
const path = require("path");
// const { cake } = require(".");

const upload = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    console.log({ title, category, description });
    const hostName = "http://localhost:4500/img/cake/";
    const file = req.file;
    console.log({ file });

    const cake = await models.cake.create({
      image: hostName + file.filename,
      title,
      category,
      description,
    });
    return res.json({ cake });
  } catch (err) {
    return res.json({ err: err.mesage });
  }
};

const recentUpload = async (req, res) => {
  try {
    const uploads = await models.cake
      .find()
      .sort({ createdAt: "desc" })
      .limit(12);
    return res.json({ uploads });
  } catch (err) {
    return res.json({ msg: err.message });
  }
};

const stats = async (req, res) => {
  try {
    const cakes = await models.cake.countDocuments();
    const comments = await models.comment.countDocuments();
    const views = await models.cake.aggregate([
      {
        $group: {
          _id: "1",
          viewsTotal: { $sum: "$views" },
        },
      },
    ]);

    const likes = await models.cake.aggregate([
      {
        $group: {
          _id: "1",
          likes: { $sum: "$likes" },
        },
      },
    ]);
    return res.json({
      cakes,
      comments,
      views: views[0].viewsTotal,
      likes: likes[0].likes,
    });
  } catch (err) {
    return res.json({ err: err.message });
  }
};

const mostPopular = async (req, res) => {
  try {
    const uploads = await models.cake.find().sort({ views: "desc" }).limit(4);
    return res.json({ uploads });
  } catch (err) {
    return res.json({ msg: err.message });
  }
};

const details = async (req, res) => {
  try {
    const { cakeId } = req.params;

    const cake = await models.cake.findById(cakeId);
    const comments = await models.comment.find({ cake });

    return res.json({ cake, comments });
  } catch (err) {
    return res.json({ msg: err.message });
  }
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

const getCategory = async (req, res) => {
  try {
    const category = req.body;
    const data = await models.cake.find(category);
    return res.json({ data });
  } catch (err) {
    return res.json({ msg: err.message });
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
  getCategory,
};
