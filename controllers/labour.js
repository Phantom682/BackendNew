const labourModel = require("../schema/labours");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

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
      const user = await labourModel.findOne({email:req.user})
      await user.populate({
        path:"user",
        select:"email firstName lastName mobile gender"
      })
      console.log(user)
      res.status(200).json({user:user})
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  profileUpdate: async (req,res) => {
    try {
      const user = await labourModel.findOneAndUpdate({ email:req.user },{ ...req.body })
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
};
