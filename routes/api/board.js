const express = require("express");
const ctrl = require("../../controlers/boards");
const { validateBody, Authenticate, isValidId } = require("../../middlewares");
const { shemas } = require("../../models/board");

const router = express.Router();
router.get("/", Authenticate, ctrl.getBoards);

router.get("/:boardId", Authenticate, ctrl.getById);

router.post(
  "/",
  Authenticate,
  validateBody(shemas.createShema),
  ctrl.createBoard
);

router.patch(
  "/:boardId",
  Authenticate,
  isValidId("boardId"),
  validateBody(shemas.editShema),
  ctrl.editBoard
);

router.delete("/:boardId", Authenticate, ctrl.deleteBoard);

module.exports = router;
