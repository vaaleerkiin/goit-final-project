const { Column } = require("../../models/column");

const createColumn = async (req, res, next) => {
  const { boardId } = req.params;
  const { name } = req.body;
  const result = await Column.create({ boardId, name });
  res.status(201).json(result);
};

module.exports = createColumn;
