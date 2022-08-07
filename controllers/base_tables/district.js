const districtModel = require("../../schema/districts");
const stateModel = require("../../schema/states");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async(req,res) => {
    try {
      const districts = await districtModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllDistricts,districts);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await districtModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(res,messages.errorMessages.stateAlreadyExists)
      const state = await stateModel.findOne({name:"Bihar"},{_id:1})
      console.log(state._id)
      const district = await districtModel.create({ ...req.body,state});
      console.log(district)
      returnMessage.successMessage(res,messages.successMessages.addDistrict,district);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  edit: async(req,res) => {
    try {
      const district = await districtModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showDistrict, district);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },
  update: async(req,res) => {
    try {
      const district = await districtModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateDistrict, district);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  delete: async(req,res) => {
    try {
      const district = await districtModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteDistrict);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      const district = await districtModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showDistrict, district);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};
