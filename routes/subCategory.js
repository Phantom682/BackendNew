const subCategory = require("../controllers/subCategory");

const router = require("express").Router();

router.get("/", subCategory.getAllSubCategories);
router.post("/", subCategory.create);
router.get("/:id/edit",subCategory.edit);
router.put("/:id",subCategory.update);
router.delete("/:id",subCategory.delete);
router.get("/:id",subCategory.show);

module.exports = router;