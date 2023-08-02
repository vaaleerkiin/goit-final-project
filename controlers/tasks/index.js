const { ctrlWrapper } = require("../../helpers");
const createTask = require("./createTask");
const deleteTask = require("./deleteTask");
const dragTask = require("./dragTask");
const editTask = require("./editTask");

module.exports = {
  createTask: ctrlWrapper(createTask),
  editTask: ctrlWrapper(editTask),
  deleteTask: ctrlWrapper(deleteTask),
  dragTask: ctrlWrapper(dragTask),
};
