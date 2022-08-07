const subCategoryModel = require("../schema/subCategory");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {

  getAllsubCategories: async(req,res) => {
    try {
      const subCategories = await subCategoryModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllSubCategories,subCategories);
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
      else {
        const isNameTaken = await subCategoryModel.findOne({ name });
        if (isNameTaken)
          returnMessage.errorMessage(res, messages.errorMessages.subCategoryAllreadyExists)
        const subCategory = await subCategoryModel.create({ ...req.body });
        console.log(subCategory)
        returnMessage.successMessage(res, messages.successMessages.addSubCategory, subCategory);
      }
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  edit: async(req,res) => {
    try {
      const subCategory = await subCategoryModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showSubCategory, subCategory);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },

  update: async(req,res) => {
    try {
      const subCategory = await subCategoryModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateSubCategory, subCategory);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  
  delete: async(req,res) => {
    try {
      const subCategory = await subCategoryModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteSubCategory,subCategory);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  show: async(req,res) => {
    try {
      const subCategory = await subCategoryModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showSubCategory, subCategory);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};
