const { Column } = require("../../models/column");
const { ObjectId } = require("mongodb");

const createTask = async (req, res, next) => {
  const { columnId } = req.params;
  const task = { ...req.body, _id: new ObjectId() };

  await Column.findByIdAndUpdate(
    columnId,
    { $push: { tasks: task } },
    { new: true }
  );
  res.status(201).json({ ...task, columnId });
};

module.exports = createTask;
