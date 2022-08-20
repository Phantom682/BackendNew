const grievanceModel = require("../schema/grievances");
const employeeModel = require("../schema/employees");
const userModel = require("../schema/users");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const mainCategories = require("../schema/mainCategories");
const subCategories = require("../schema/subCategories");

module.exports = {

  getAllGrievances: async (req, res) => {
    try {
      const role = req.role;
      if(role === "super-admin"){
        let grievances = await grievanceModel.find({});
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllGrievances,
          grievances
        );
      }
      else if(role === "user"){
        const userId = await userModel.findOne({email:req.user},{_id:1})
        let grievances = await grievanceModel.find({createdBy:userId})
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllGrievances,
          grievances
        );
      }
      else if(role === "ministry-admin" || role === "department-admin" || role === "organisation-admin"){
        const empId = await employeeModel.findOne({role:role},{_id:1})
        let grievances = await grievanceModel.find({assignedTo:empId})
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllGrievances,
          grievances
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  fileGrievance: async (req, res) => {
    try {
      const body = JSON.parse(JSON.stringify(req.body))

      const mainCategory = await mainCategories.findOne({name:body.mainCat})

      const requiredSubCategory = mainCategory.subCategoryId.find(function mapping(mainCat){return mainCat == body.subCat})
      
      const grievance = await grievanceModel.create({
        createdBy: req.body.createdBy,
        fileName: req.file.filename,
        filePath: req.file.path,
        mainCat: body.mainCat,
        subCat: body.subCat,
        description: body.dis || body.audioGriev,
        deadline: Date.now(),
        status:"under scrunity",
        createdAt:Date.now(),
        verifiedAt:Date.now()
      });

      await subCategories.findByIdAndUpdate({_id:requiredSubCategory},{$push:{grievanceId:grievance._id}})
      console.log(grievance)
      returnMessage.successMessage(
        res,
        messages.successMessages.addGrievance,
        grievance
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  edit: async (req, res) => {
    try {
      const grievance = await grievanceModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showgrievance,
        grievance
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const grievance = await grievanceModel.findByIdAndUpdate(
        req.params["id"],
        { ...req.body }
      );
      returnMessage.successMessage(
        res,
        messages.successMessages.updategrievance,
        grievance
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const grievance = await grievanceModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.deletegrievance,
        grievance
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  show: async (req, res) => {
    try {
      const grievance = await grievanceModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showgrievance,
        grievance
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
