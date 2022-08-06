const userModel = require("../schema/users");
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

      const role = await roleModel.findOne({name:"superAdmin"},{_id:1});

      userModel.create({ ...req.body, salt, hash, role});
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

  profile: async (req,res) => {
    try {
      const user = await userModel.findOne({email:req.user})
      res.status(200).json({user:user})
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
};
