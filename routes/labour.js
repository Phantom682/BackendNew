const user = require("../controllers/labour");
const { checkPermission } = require('../middlewares/permissionMiddleware')

const router = require("express").Router();

router.get("/", user.getAllLabours);
router.delete("/:id",user.delete);
// router.get("/:id",user.show);
router.get("/profile",checkPermission("view-analytics"),user.profile);
router.put("/profileUpdate",checkPermission("view-analytics"),user.profileUpdate);

module.exports = router;