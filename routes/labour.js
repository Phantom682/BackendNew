const labour = require("../controllers/labour");

const router = require("express").Router();

router.get("/", labour.getAllLabours);
router.delete("/:id",labour.delete);
router.get("/:id",labour.show);

module.exports = router;