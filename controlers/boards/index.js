const { ctrlWrapper } = require("../../helpers");
const createBoard = require("./createBoard");
const deleteBoard = require("./deleteBoard");
const editBoard = require("./editBoard");
const getById = require("./getById");

module.exports = {
  createBoard: ctrlWrapper(createBoard),
  editBoard: ctrlWrapper(editBoard),
  getById: ctrlWrapper(getById),
  deleteBoard: ctrlWrapper(deleteBoard),
};
