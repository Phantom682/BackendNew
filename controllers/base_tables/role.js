const roleModel = require("../../schema/roles");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async(req,res) => {
    try {
      const states = await roleModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllStates,states);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await roleModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(res,messages.errorMessages.stateAlreadyExists)
      const country = await countryModel.findOne({name:"INDIA"},{_id:1})
      const state =await roleModel.create({ ...req.body,country});
      returnMessage.successMessage(res,messages.successMessages.addState,state);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  edit: async(req,res) => {
    try {
      const state = await roleModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showState, state);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },
  update: async(req,res) => {
    try {
      const state = await roleModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateState, state);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  delete: async(req,res) => {
    try {
      const state = await roleModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteState);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      const state = await roleModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showState, state);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};
