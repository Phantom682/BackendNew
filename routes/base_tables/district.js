const district = require("../../controllers/base_tables/district");

const router = require("express").Router();

router.get("/", district.index);
router.post("/", district.create);
router.get("/:id/edit",district.edit);
router.put("/:id",district.update);
router.delete("/:id",district.delete);
router.get("/:state",district.show);

module.exports = router;