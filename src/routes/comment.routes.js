const { Router } = require("express");
const controllers = require("../controllers");
const router = Router();

router.get("/lastestComments", controllers.comment.lastestComments);
router.post("/create", controllers.comment.create);
router.delete("/remove", controllers.comment.remove);

module.exports = router;
