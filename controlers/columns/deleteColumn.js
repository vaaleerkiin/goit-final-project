const { HttpError } = require("../../helpers");
const { Column } = require("../../models/column");

const deleteColumn = async (req, res, next) => {
  const { columnId } = req.params;
  const data = await Column.findById(columnId);
  if (data.tasks.length !== 0) {
    throw HttpError(400, "The column must be empty");
  }
  const result = await Column.findByIdAndDelete(columnId);
  res.status(201).json(result);
};

module.exports = deleteColumn;
