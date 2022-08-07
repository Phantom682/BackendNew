const organisation = require("../../controllers/base_tables/organisation");

const router = require("express").Router();

router.get("/", organisation.getAllOrganisations);
router.post("/", organisation.create);
router.get("/:id/edit",organisation.edit);
router.put("/:id",organisation.update);
router.delete("/:id",organisation.delete);
router.get("/:id",organisation.show);

module.exports = router;