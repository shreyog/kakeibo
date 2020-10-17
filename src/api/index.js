const { Router } = require("express");
const auth = require("./routes/auth.routes");
const user = require("./routes/user.routes");

const router = Router();

router.use("/auth", auth);
router.use("/users", user);

module.exports = router;
