const district = require("../../controllers/base_tables/district");

const router = require("express").Router();

router.get("/", district.getAllDistricts);
router.post("/", district.create);
router.get("/:id/edit",district.edit);
router.put("/:id",district.update);
router.delete("/:id",district.delete);
router.get("/:id",district.show);

module.exports = router;