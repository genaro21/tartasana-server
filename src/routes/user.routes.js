const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

router.post("/sign-in", controllers.user.signIn);

router.post("/sign-up", controllers.user.signUp);

module.exports = router;
