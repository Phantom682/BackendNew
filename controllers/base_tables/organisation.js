const organisationModel = require("../../schema/organisations");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {

  getAllOrganisations: async(req,res) => {
    try {
      const organisations = await organisationModel.find({});
      console.log(await organisations[0].departments[0])
      returnMessage.successMessage(res,messages.successMessages.getAllOrganisations,organisations);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  create: async (req, res) => {
    try {
      console.log(req.body)
      const { name } = req.body;
      const isNameTaken = await organisationModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(res,messages.errorMessages.organisationAllreadyExists)
      const organisation = await organisationModel.create({ ...req.body});
      console.log(organisation)
      returnMessage.successMessage(res,messages.successMessages.addOrganisation,organisation);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },

  edit: async(req,res) => {
    try {
      const organisation = await organisationModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showOrganisation, organisation);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },

  update: async(req,res) => {
    try {
      const organisation = await organisationModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateOrganisation, organisation);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  delete: async(req,res) => {
    try {
      const organisation = await organisationModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteOrganisation,organisation);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      const organisation = await organisationModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showOrganisation, district);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};
