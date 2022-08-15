const grievance = require("../controllers/grievance");
const uploader = require('../middlewares/uploadMiddleware')
const router = require("express").Router();
const { checkPermission } = require('../middlewares/permissionMiddleware')


router.get("/",checkPermission("view-analytics"), grievance.getAllGrievances);
router.get("/:id",grievance.show);
router.post("/",uploader.upload.single("file"),grievance.fileGrievance);
router.delete("/:id",grievance.delete);

module.exports = router;