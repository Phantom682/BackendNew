const mainCategoryModel = require("../schema/mainCategory");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {

  getAllMainCategories: async(req,res) => {
    try {
      const mainCategories = await mainCategoryModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllMainCategories,mainCategories);
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
        const isNameTaken = await mainCategoryModel.findOne({ name });
        if (isNameTaken)
          returnMessage.errorMessage(res, messages.errorMessages.mainCategoryAllreadyExists)
        const mainCategory = await mainCategoryModel.create({ ...req.body });
        console.log(mainCategory)
        returnMessage.successMessage(res, messages.successMessages.addMainCategory, mainCategory);
      }
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  edit: async(req,res) => {
    try {
      const mainCategory = await mainCategoryModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showMainCategory, mainCategory);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },

  update: async(req,res) => {
    try {
      const mainCategory = await mainCategoryModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateMainCategory, mainCategory);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  
  delete: async(req,res) => {
    try {
      const mainCategory = await mainCategoryModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteMainCategory,mainCategory);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  show: async(req,res) => {
    try {
      const mainCategory = await mainCategoryModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showMainCategory, mainCategory);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};
