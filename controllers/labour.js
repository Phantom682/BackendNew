const labourModel = require("../schema/labours");
const userModel = require("../schema/users");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const { findOne } = require("../schema/users");

module.exports = {

  getAllLabours: async(req,res) => {
    try {
      const labours = await labourModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllLabours,labours);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  delete: async(req,res) => {
    try {
      const labour = await labourModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteLabour,labour);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  show: async(req,res) => {
    try {
      const labour = await labourModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showLabour, labour);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },

  profile: async (req,res) => {
    try {
      const user = await userModel.findOne({email:req.user})
      const labour = await labourModel.findOne({user:user._id})
      await labour.populate({
        path:"user",
        select:"email firstName lastName mobile gender role",
        populate:{
          path:'role',
          select:'name'
        }
      })
      res.status(200).json({labour})
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  profileUpdate: async (req,res) => {
    try {
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let gender = req.body.gender;
      let country = req.body.country;
      let state = req.body.state;
      let address1 = req.body.address1;
      let address2 = req.body.address2;
      let district = req.body.district;
      let pincode = req.body.pincode;
      
      const user = await userModel.findOne({email:req.user})
      const userData = await userModel.findOneAndUpdate(
        { email: req.user },
        {
          $set: {
            firstName,
            lastName,
            gender
          }
        },
        { new: true }
      )
      const labourData = await labourModel.findOneAndUpdate(
        { user: user._id },
        {
          $set:{
            address1,
            address2,
            country,
            state,
            district,
            pincode
            
          }
        },
        {new:true}
        )
        const labour = {
          userData,
          labourData
        }
        returnMessage.successMessage(res,messages.successMessages.showLabour, labour);
    } catch (error) {
      console.log(error.message);
    }
  },
};
