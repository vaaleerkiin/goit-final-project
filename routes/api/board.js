const express = require("express");
const ctrl = require("../../controlers/boards");
const { validateBody, Authenticate } = require("../../middlewares");
const { shemas } = require("../../models/board");

const router = express.Router();

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
  validateBody(shemas.editShema),
  ctrl.editBoard
);

router.delete("/:boardId", Authenticate, ctrl.deleteBoard);

module.exports = router;
