const employeeModel = require("../schema/employees");
const grievanceModel = require("../schema/grievances");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  getAllemployees: async (req, res) => {
    try {
      const employees = await employeeModel.find({});
      const empList = await Promise.all(
        employees.map(
          async (emp) =>
            await emp.populate({
              path: "user",
              populate: {
                path: "role",
                select: "name",
              },
            })
        )
      );
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllemployees,
        empList
      );
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
        const isNameTaken = await employeeModel.findOne({ name });
        if (isNameTaken)
          returnMessage.errorMessage(
            res,
            messages.errorMessages.employeeAllreadyExists
          );
        const employee = await employeeModel.create({ ...req.body });
        console.log(employee);
        returnMessage.successMessage(
          res,
          messages.successMessages.addemployee,
          employee
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  edit: async (req, res) => {
    try {
      const employee = await employeeModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showemployee,
        employee
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const employee = await employeeModel.findByIdAndUpdate(req.params["id"], {
        ...req.body,
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.updateemployee,
        employee
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const employee = await employeeModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.deleteemployee,
        employee
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const employee = await employeeModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showemployee,
        employee
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  takeAction: async (req, res) => {
    try {
      console.log(req.params.id);
      console.log(req.body.status);
      const grievance = await grievanceModel.findOneAndUpdate(
        { _id: req.params["id"] },
        { $set: { status: req.body.status } }
      );
      console.log(grievance);
      returnMessage.successMessage(
        res,
        messages.successMessages.actionSuccessful,
        grievance
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
