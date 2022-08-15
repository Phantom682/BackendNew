const subCategoryModel = require("../schema/subCategories");
const employeeModel = require("../schema/employees");
const userModel = require("../schema/users");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  getAllsubCategories: async (req, res) => {
    try {
      const role = req.body.role; // need to be done using token 
      console.log(role);
      if (role === "super-admin") {
        let grievances = await grievanceModel.find({});
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllsubCategories,
          grievances
        );
      } else if (role === "department-employee") {
        const user = await userModel.findOne({
          email: "pavan.metkari02@gmail.com", // need to done using token
        });
        const employee = await employeeModel.findOne({user:user._id})
        let grievances = await employee.populate({
          path: "subCatId",
          select: "name",
          populate: {
            path: "grievanceId",
            select: "status",
          },
        });
        const subCats = grievances.subCatId.map(function sub(subCat) {
          return subCat.name;
        });
        const grie = grievances.subCatId.map(function sub(subCat) {
          return subCat.grievanceId.map(function griev(grev) {
            return { id: grev._id, greievanceStatus: grev.status };
          });
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllsubCategories,
          grie
        );
      } else if (
        role === "ministry-admin" ||
        role === "department-admin" ||
        role === "organisation-admin"
      ) {
        const empId = await employeeModel.findOne({ role: role }, { _id: 1 });
        let grievances = await grievanceModel.find({ assignedTo: empId });
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllsubCategories,
          grievances
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { name } = req.body;
      if (name.length <= 0) {
        return returnMessage.errorMessage(
          res,
          messages.errorMessages.fieldCanNotEmpty
        );
      } else {
        const isNameTaken = await subCategoryModel.findOne({ name });
        if (isNameTaken)
          returnMessage.errorMessage(
            res,
            messages.errorMessages.subCategoryAllreadyExists
          );
        const subCategory = await subCategoryModel.create({ ...req.body });
        console.log(subCategory);
        returnMessage.successMessage(
          res,
          messages.successMessages.addSubCategory,
          subCategory
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  edit: async (req, res) => {
    try {
      const subCategory = await subCategoryModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showSubCategory,
        subCategory
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const subCategory = await subCategoryModel.findByIdAndUpdate(
        req.params["id"],
        { ...req.body }
      );
      returnMessage.successMessage(
        res,
        messages.successMessages.updateSubCategory,
        subCategory
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const subCategory = await subCategoryModel.remove({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.deleteSubCategory,
        subCategory
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  show: async (req, res) => {
    try {
      const subCategory = await subCategoryModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showSubCategory,
        subCategory
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
