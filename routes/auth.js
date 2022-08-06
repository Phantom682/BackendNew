const user = require("../controllers/user");
const { checkPermission } = require('../middlewares/permissionMiddleware')
const router = require("express").Router();

router.post("/register", user.register);
router.get("/profile",checkPermission("see profile"), user.profile);
router.post("/login",checkPermission("login"), user.login);

module.exports = router;
