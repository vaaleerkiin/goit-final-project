const express = require("express");
const ctrl = require("../../controlers/columns");
const { Authenticate, validateBody, isValidId } = require("../../middlewares");
const { shemas } = require("../../models/column");

const router = express.Router();

router.post(
  "/:boardId",
  Authenticate,
  isValidId("boardId"),
  validateBody(shemas.createShema),
  ctrl.createColumn
);

router.patch(
  "/:columnId",
  Authenticate,
  isValidId("columnId"),
  validateBody(shemas.editShema),
  ctrl.editColumn
);

router.delete(
  "/:columnId",
  Authenticate,
  isValidId("columnId"),
  ctrl.deleteColumn
);

module.exports = router;
