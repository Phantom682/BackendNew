const state = require("../../controllers/base_tables/state");

const router = require("express").Router();

router.get("/", state.getAllStates);
router.post("/", state.create);
router.get("/:id/edit",state.edit);
router.put("/:id",state.update);
router.delete("/:id",state.delete);
router.get("/:id",state.show);

module.exports = router;