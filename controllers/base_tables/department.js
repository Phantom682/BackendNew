const departmentModel = require("../../schema/departments");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {

  getAllDepartments: async(req,res) => {
    try {
      const departments = await departmentModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllDepartments,departments);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  create: async (req, res) => {
    try {
      console.log(req.body)
      const { name } = req.body;
      const isNameTaken = await departmentModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(res,messages.errorMessages.departmentAllreadyExists)
      const department = await departmentModel.create({ ...req.body});
      console.log(department)
      returnMessage.successMessage(res,messages.successMessages.addDepartment,department);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  edit: async(req,res) => {
    try {
      const department = await departmentModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showDepartment, department);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },

  update: async(req,res) => {
    try {
      const department = await departmentModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateDepartment, department);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  
  delete: async(req,res) => {
    try {
      const department = await departmentModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteDepartment,department);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  show: async(req,res) => {
    try {
      const department = await departmentModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showDepartment, department);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};
