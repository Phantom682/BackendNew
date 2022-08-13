const grievanceModel = require("../schema/grievances");
const subcatModel = require("../schema/subCategories");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const mainCategories = require("../schema/mainCategories");
const subCategories = require("../schema/subCategories");

module.exports = {

  getAllGrievances: async (req, res) => {
    try {
      const grievances = await grievanceModel.find({});
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllGrievances,
        grievances
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  fileGrievance: async (req, res) => {
    try {
      console.log(req.file,req.body.details.mainCat);
  //     const mainCategory = await mainCategories.findOne({_id:req.body.body.mainCat})
  //     console.log({mainCat:mainCategory})

  //     const requiredSubCategory = mainCategory.subCategoryId.find(function mapping(mainCat){return mainCat == req.body.body.subCat})
  //     console.log({reqSub:requiredSubCategory})
      
  //     const grievance = await grievanceModel.create({
  //       fileName: req.file.filename,
  //       filePath: req.file.path,
  //       mainCat:req.body.body.mainCat,
  //       subCat:req.body.body.subCat,
  //       deadline: Date.now(),
  //       status:"under scrunity",
  //       createdAt:Date.now(),
  //       verifiedAt:Date.now()
  //     });
  //     console.log(grievance);
  //     console.log(await subCategories.findByIdAndUpdate({_id:requiredSubCategory},{$push:{grievanceId:grievance._id}}))
  //     returnMessage.successMessage(
  //       res,
  //       messages.successMessages.addGrievance,
  //       grievance
  //     );
  //   } catch (error) {
  //     returnMessage.errorMessage(res, error);
  //   }
  // },

  // edit: async (req, res) => {
  //   try {
  //     const grievance = await grievanceModel.findOne({ _id: req.params["id"] });
  //     returnMessage.successMessage(
  //       res,
  //       messages.successMessages.showgrievance,
  //       grievance
  //     );
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
