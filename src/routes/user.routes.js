const { Router } = require("express");
const controllers = require("../controllers");
const multer = require("multer");
const config = require("../config");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.imageFolder);
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

router.post("/sign-in", controllers.user.signIn);

router.post("/sign-up", uploads.single("avatar"), controllers.user.signUp);

module.exports = router;
