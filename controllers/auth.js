const userModel = require("../schema/users");
const labourModel = require("../schema/labours");
const roleModel = require("../schema/roles");
const { hashPassword, signToken, verifyToken } = require("../utils");

module.exports = {
  register: async (req, res) => {
    try {
      const { password, email } = req.body;

      const isEmailTaken = await userModel.findOne({ email });
      if (isEmailTaken)
        return res.status(400).json({ message: "Email already exists" });

      const { salt, hash } = hashPassword(password);

      delete req.body.password;

      const role = await roleModel.findOne({name:"super-admin"},{_id:1});

      const user = await userModel.create({ ...req.body, salt, hash, role});
      labourModel.create({user:user._id});
      res.status(201).json({
        message: "User registered",
        token: signToken({ email: req.body.email }),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  login: async (req, res) => {
    try {
      const { password, email } = req.body;

      const userData = await userModel.findOne({ email });
      if (!userData)
        return res.status(400).json({ message: "User is not registered" });

      const hashedPass = hashPassword(password, userData.salt);

      if (hashedPass.hash === userData.hash) {
        return res.status(200).json({
          status:"success",
          message: "User logged in",
          token: signToken({ email: req.body.email }),
        });
      }
      return res.status(400).json({ message: "Incorrect password" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
};
