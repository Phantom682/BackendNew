const grievance = require("../controllers/grievance");

const router = require("express").Router();

router.get("/", grievance.getAllGrievances);
router.get("/:id",grievance.show);

module.exports = router;