const router = require("express").Router();

const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoute");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;