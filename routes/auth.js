const user = require("../controllers/user");
const { checkPermission } = require('../middlewares/permissionMiddleware')
const { registrationAuthRules, validateRegistration, loginAuthRules, validateLogin } = require('../utils/validations')
const router = require("express").Router();

router.post("/register",registrationAuthRules(), validateRegistration, user.register);
router.get("/profile",checkPermission("see profile"), user.profile);
router.post("/login",loginAuthRules(), validateLogin, user.login);

module.exports = router;
