const { Router } = require("express");
const controllers = require("../controllers");
const multer = require("multer");

const uploads = multer({
  dest: "./src/statics",
});

const router = Router();

router.post("/sign-in", controllers.user.signIn);

router.post("/sign-up", uploads.single("avatar"), controllers.user.signUp);

module.exports = router;
