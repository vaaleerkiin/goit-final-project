const { Column } = require("../../models/column");

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;

  const data = await Column.findOne({
    tasks: { $elemMatch: { _id: taskId } },
  });
  const tasks = data.tasks.filter(({ _id }) => _id.toString() !== taskId);

  const result = await Column.findByIdAndUpdate(data._id, { tasks });

  res.status(200).json(result);
};

module.exports = deleteTask;
