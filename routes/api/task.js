const express = require("express");
const ctrl = require("../../controlers/tasks");
const { Authenticate, validateBody, isValidId } = require("../../middlewares");
const { shemas } = require("../../models/column");

const router = express.Router();

router.post(
  "/:columnId",
  Authenticate,
  isValidId("columnId"),
  validateBody(shemas.createTaskShema),
  ctrl.createTask
);

router.patch(
  "/:taskId",
  Authenticate,
  isValidId("taskId"),
  validateBody(shemas.createTaskShema),
  ctrl.editTask
);

router.delete("/:taskId", Authenticate, isValidId("taskId"), ctrl.deleteTask);

router.patch(
  "/dragTask/:taskId",
  Authenticate,
  isValidId("taskId"),
  validateBody(shemas.dragShema),
  ctrl.dragTask
);

module.exports = router;
