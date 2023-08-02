const express = require("express");
const ctrl = require("../../controlers/tasks");
const { Authenticate, validateBody } = require("../../middlewares");
const { shemas } = require("../../models/column");

const router = express.Router();

router.post(
  "/:columnId",
  Authenticate,
  //   isValidId,
  validateBody(shemas.createTaskShema),
  ctrl.createTask
);

router.patch(
  "/:taskId",
  Authenticate,
  //   isValidId,
  validateBody(shemas.createTaskShema),
  ctrl.editTask
);

router.delete("/:taskId", Authenticate, ctrl.deleteTask);

router.patch(
  "/dragTask/:taskId",
  validateBody(shemas.dragShema),
  ctrl.dragTask
);

module.exports = router;
