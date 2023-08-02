const express = require("express");
const ctrl = require("../../controlers/columns");
const { Authenticate, validateBody } = require("../../middlewares");
const { shemas } = require("../../models/column");

const router = express.Router();

router.post(
  "/:boardId",
  Authenticate,
  validateBody(shemas.createShema),
  ctrl.createColumn
);

router.patch(
  "/:columnId",
  Authenticate,
  validateBody(shemas.editShema),
  ctrl.editColumn
);

router.delete("/:columnId", Authenticate, ctrl.deleteColumn);

module.exports = router;
