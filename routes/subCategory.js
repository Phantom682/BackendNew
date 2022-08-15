const subCategory = require("../controllers/subCategory");
const { checkPermission } = require('../middlewares/permissionMiddleware')
const router = require("express").Router();

router.get("/", subCategory.getAllsubCategories);
router.post("/", subCategory.create);
router.get("/:id/edit",subCategory.edit);
router.put("/:id",subCategory.update);
router.delete("/:id",subCategory.delete);
router.get("/:id",subCategory.show);

module.exports = router;