const countryModel = require("../../schema/countries");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async(req,res) => {
    try {
      const countries = await countryModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllCountries,countries);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await countryModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(res,messages.errorMessages.countryAlreadyExists)

      const country = countryModel.create({ ...req.body });
      console.log(country)
      returnMessage.successMessage(res,messages.successMessages.addCountry,country);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  edit: async(req,res) => {
    try {
      const country = await countryModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showCountry, country);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },
  update: async(req,res) => {
    try {
      const country = await countryModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateCountry, country);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  delete: async(req,res) => {
    try {
      const country = await countryModel.remove({ '_id': req.params['id'] });
      console.log(country)
      returnMessage.successMessage(res,messages.successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      const country = await countryModel.findOne({_id: req.params['id'] })
      console.log(country)
      returnMessage.successMessage(res,messages.successMessages.showCountry, country);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};
