const { Column } = require("../../models/column");

const editColumn = async (req, res, next) => {
  const { columnId } = req.params;
  const result = await Column.findByIdAndUpdate(columnId, req.body, {
    new: true,
  });
  res.status(201).json(result);
};

module.exports = editColumn;
