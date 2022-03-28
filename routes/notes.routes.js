const express = require("express");
const noteController = require("../controllers/notes.controller");
const router = express.Router();

router.post("/", noteController.create);
router.get("/", noteController.listAll);
router.get("/:noteId", noteController.getById);
router.put("/:noteId", noteController.updateById);
router.delete("/:noteId", noteController.deleteById);

module.exports = router;