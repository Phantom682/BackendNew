const role = require("../../controllers/base_tables/role");

const router = require("express").Router();

router.get("/", role.index);
router.post("/", role.create);
router.get("/:id/edit",role.edit);
router.put("/:id",role.update);
router.delete("/:id",role.delete);
router.get("/:role",role.show);

module.exports = router;