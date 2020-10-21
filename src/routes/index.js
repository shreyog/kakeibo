const { Router } = require("express");
const auth = require("./auth.routes");
const user = require("./user.routes");

const router = Router();

router.use("/auth", auth);
router.use("/users", user);

module.exports = router;
