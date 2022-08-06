const { body, validationResult } = require("express-validator");

module.exports = {
  registrationAuthRules: () => {
    return [
      body("email").isEmail(),
      body("mobile").isLength({ max: 10 }),
      body("password").isAlphanumeric().isLength({ min: 6 }),
    ];
  },

  validateRegistration: (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (errors.isEmpty()) {
      return next();
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  },

  loginAuthRules: () => {
    return [
      body("email").isEmail(),
      body("password").isAlphanumeric().isLength({ min: 6 }),
    ];
  },

  validateLogin: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  },
};
