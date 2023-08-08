const { Column } = require("../../models/column");

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;

  const data = await Column.findOne({
    tasks: { $elemMatch: { _id: taskId } },
  });
  const tasks = data.tasks.filter(({ _id }) => _id.toString() !== taskId);

  await Column.findByIdAndUpdate(data._id, { tasks });

  res.status(200).json({ message: "task deleted" });
};

module.exports = deleteTask;
