const employee = require("../controllers/employee");

const router = require("express").Router();

router.get("/", employee.getAllemployees);
router.post("/action/:id", employee.takeAction);
router.post("/", employee.create);
router.get("/:id/edit",employee.edit);
router.put("/:id",employee.update);
router.delete("/:id",employee.delete);

module.exports = router;
