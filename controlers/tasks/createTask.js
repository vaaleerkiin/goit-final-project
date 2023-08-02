const { Column } = require("../../models/column");
const { ObjectId } = require("mongodb");
const createTask = async (req, res, next) => {
  const { columnId } = req.params;
  const result = await Column.findByIdAndUpdate(
    columnId,
    { $push: { tasks: { ...req.body, _id: new ObjectId() } } },
    { new: true }
  );
  res.status(201).json(result);
};

module.exports = createTask;
