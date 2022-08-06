const user = require("../controllers/user");
const { checkPermission } = require('../middlewares/checkPermission')
const router = require("express").Router();

router.post("/register", user.register);
router.post("/login",checkPermission, user.login);

module.exports = router;
