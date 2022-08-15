const user = require("../controllers/labour");
const { checkPermission } = require('../middlewares/permissionMiddleware')

const router = require("express").Router();

router.get("/", user.getAllLabours);
// router.delete("/:id",user.delete);
router.get("/profile",checkPermission("view-profile"),user.profile);
router.patch("/profileUpdate",checkPermission("view-profile"),user.profileUpdate);

module.exports = router;