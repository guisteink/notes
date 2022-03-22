const express = require("express");
const noteController = require("../controllers/notes.controller");
const router = express.Router();

router.post("/", noteController.create);
router.get("/", noteController.listAll);
router.get("/:todoId", noteController.getById);
router.put("/:todoId", noteController.updateById);
router.delete("/:todoId", noteController.deleteById);

module.exports = router;