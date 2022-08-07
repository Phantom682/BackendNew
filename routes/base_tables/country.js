const country = require("../../controllers/base_tables/country");

const router = require("express").Router();

router.get("/", country.getAllCountries);
router.post("/", country.create);
router.get("/:id/edit",country.edit);
router.put("/:id",country.update);
router.delete("/:id",country.delete);
router.get("/:id",country.show);

module.exports = router;
