const mainCategory = require("../controllers/mainCategory");

const router = require("express").Router();

router.get("/", mainCategory.getAllMainCategories);
router.post("/", mainCategory.create);
router.get("/:id/edit",mainCategory.edit);
router.put("/:id",mainCategory.update);
router.delete("/:id",mainCategory.delete);
router.get("/:id",mainCategory.show);

module.exports = router;