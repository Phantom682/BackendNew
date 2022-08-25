const auth = require("../controllers/auth");
const { registrationAuthRules, validateRegistration, loginAuthRules, validateLogin } = require('../utils/validations')
const router = require("express").Router();

router.post("/register",registrationAuthRules(), validateRegistration, auth.register);
router.post("/register/employee",registrationAuthRules(), validateRegistration, auth.registerEmployee);
router.post("/login",loginAuthRules(), validateLogin, auth.login);

module.exports = router;
