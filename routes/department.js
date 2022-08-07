const department = require("../controllers/department");

const router = require("express").Router();

router.get("/", department.getAllDepartments);
router.post("/", department.create);
router.get("/:id/edit",department.edit);
router.put("/:id",department.update);
router.delete("/:id",department.delete);
router.get("/:id",department.show);

module.exports = router;