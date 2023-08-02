const { Column } = require("../../models/column");

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;

  await Column.updateOne({}, { $pull: { tasks: { _id: taskId } } });
  res.status(204).json();
};

module.exports = deleteTask;
