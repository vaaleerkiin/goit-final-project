const { HttpError } = require("../../helpers");
const { Column } = require("../../models/column");

const deleteColumn = async (req, res, next) => {
  const { columnId } = req.params;

  const result = await Column.findOneAndDelete({
    _id: columnId,
    tasks: { $size: 0 },
  });

  if (!result) {
    throw HttpError(404, "The column must be empty");
  }

  res.status(201).json({ message: "column deleted" });
};

module.exports = deleteColumn;
