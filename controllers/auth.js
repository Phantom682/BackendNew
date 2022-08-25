const userModel = require("../schema/users");
const labourModel = require("../schema/labours");
const employeeModel = require("../schema/employees");
const roleModel = require("../schema/roles");
const nodemailer = require("nodemailer");
const returnMessage = require("./message");
const UserVerification = require("../schema/userVerifications")
require('dotenv').config()
const { hashPassword, signToken, verifyToken } = require("../utils");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const sendVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    // mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>your otp is </P><strong> ${otp} </strong>`,
    };
    const newOtpVerification = new UserVerification({
      userId: _id,
      otp: otp,
      createdAt: new Date(),
      expiredAt: new Date().setMinutes(new Date().getMinutes() + 10),
    });
    await newOtpVerification.save();
    await transporter.sendMail(mailOptions);
    let data = { message: "User registered", token: signToken({ email: email })};
    returnMessage.successMessage(res,data);
  } catch (error) {
    returnMessage.errorMessage(res, error);
  }
}

module.exports = {
  register: async (req, res) => {
    try {
      const { password, email } = req.body;

      const isEmailTaken = await userModel.findOne({ email });
      if (isEmailTaken)
        return res.status(400).json({ message: "Email already exists" });

      const { salt, hash } = hashPassword(password);

      delete req.body.password;

      const role = await roleModel.findOne({ name: "user" }, { _id: 1 });

      const user = await userModel.create({
        ...req.body,
        salt,
        hash,
        role,
        verified: false,
      });
      await labourModel.create({ user: user._id });
      if (user) sendVerificationEmail(user, res);
      else returnMessage.errorMessage(res, "user is not created");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      let { userId, otp } = req.body;
      if (!userId || !otp) {
        returnMessage.errorMessage(res, messages.errorMessages.emptyOtp);
      } else {
        const userVerificationRecord = await UserVerification.find({
          userId: userId,
        });
        if (userVerificationRecord.length <= 0) {
          returnMessage.errorMessage(res, messages.errorMessages.accountRecord);
        } else {
          // check expiry
          const { expiredAt } = userVerificationRecord[0];
          const originalOtp = userVerificationRecord[0].otp;
          if (currentDateTime(expiredAt) < Date.now()) {
            // otp expired
            await UserVerification.softDelete({ userId });
            returnMessage.errorMessage(res, messages.errorMessages.expireOtp);
          } else {
            // success
            if (otp === originalOtp) {
              await User.updateOne({ _id: userId }, { verified: true });
              await UserVerification.softDelete({ userId });
              returnMessage.successMessage(res, messages.successMessages.verifySuccess);
            } else {
              returnMessage.errorMessage(res, messages.errorMessages.otpNotMatch);
            }
          }
        }
      }
    } catch (error) {
      let message = error;
      errorMessage(res, message);
    }
  },

  registerEmployee: async (req, res) => {
    try {
      const { password, email } = req.body;

      const isEmailTaken = await userModel.findOne({ email });
      if (isEmailTaken)
        return res.status(400).json({ message: "Email already exists" });

      const { salt, hash } = hashPassword(password);

      delete req.body.password;

      const role = await roleModel.findOne({ name: req.body.role }, { _id: 1 });

      const user = await userModel.create({ ...req.body, salt, hash, role });
      employeeModel.create({ user: user._id });
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
      await userData.populate({
        path: "role",
        select: "name",
      });
      if (hashedPass.hash === userData.hash) {
        return res.status(200).json({
          status: "success",
          message: "User logged in",
          token: signToken({ email: req.body.email }),
          userData: userData,
        });
      }
      return res.status(400).json({ message: "Incorrect password" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
};
