const { Router } = require("express");
const controllers = require("../controllers");
const multer = require("multer");
const config = require("../config");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/statics/img/cake");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

const uploads = multer({
  storage: storage,
  //   limits: {
  //     fileSize: 100000,
  //   },
});

const router = Router();

router.post("/upload", uploads.single("image"), controllers.cake.upload);
router.get("/recentUpload", controllers.cake.recentUpload);
router.get("/stats", controllers.cake.stats);
router.get("/mostPopular", controllers.cake.mostPopular);
router.get("/details/:cakeId", controllers.cake.details);
router.get("/getCategory/:category", controllers.cake.getCategory);
router.get("/getAll", controllers.cake.getAll);
router.delete("/remove", controllers.cake.remove);
router.post("/like", controllers.cake.like);
router.post("/view", controllers.cake.view);

module.exports = router;
