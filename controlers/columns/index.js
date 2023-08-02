const { ctrlWrapper } = require("../../helpers");
const createColumn = require("./createColumn");
const deleteColumn = require("./deleteColumn");
const editColumn = require("./editColumn");

module.exports = {
  createColumn: ctrlWrapper(createColumn),
  editColumn: ctrlWrapper(editColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
