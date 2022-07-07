const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

router.post("/upload", controllers.cake.upload);
router.get("/recentUpload", controllers.cake.recentUpload);
router.get("/stats", controllers.cake.stats);
router.get("/mostPopular", controllers.cake.mostPopular);
router.get("/details/:cakeId", controllers.cake.details);
router.delete("/remove", controllers.cake.remove);
router.post("/like", controllers.cake.like);

module.exports = router;
