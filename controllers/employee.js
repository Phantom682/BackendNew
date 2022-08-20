const employeeModel = require("../schema/employees");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {

  getAllemployees: async(req,res) => {
    try {
      const employees = await employeeModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllemployees,employees);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  create: async (req, res) => {
    try {
      const { name } = req.body;
      if (name.length <= 0) {
        return returnMessage.errorMessage(res, messages.errorMessages.fieldCanNotEmpty)
      }
      else{
        const isNameTaken = await employeeModel.findOne({ name });
        if (isNameTaken)
          returnMessage.errorMessage(res,messages.errorMessages.employeeAllreadyExists)
        const employee = await employeeModel.create({ ...req.body});
        console.log(employee)
        returnMessage.successMessage(res,messages.successMessages.addemployee,employee);
      }
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  edit: async(req,res) => {
    try {
      const employee = await employeeModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showemployee, employee);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },

  update: async(req,res) => {
    try {
      const employee = await employeeModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateemployee, employee);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  delete: async(req,res) => {
    try {
      const employee = await employeeModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteemployee,employee);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      const employee = await employeeModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showemployee, employee);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }

};

