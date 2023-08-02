const { Column } = require("../../models/column");

const dragTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { columnId, indexFrom, indexTo } = req.body;

  const data = await Column.findOne({
    tasks: { $elemMatch: { _id: taskId } },
  });

  const currnetTask = data.tasks[indexFrom];
  data.tasks.splice(indexFrom, 1);

  await Column.findByIdAndUpdate(
    data._id,
    { tasks: data.tasks },
    { new: true }
  );

  const tasks = await Column.findById(columnId);

  tasks.tasks.splice(indexTo, 0, currnetTask);

  const result = await Column.findByIdAndUpdate(
    columnId,
    {
      tasks: tasks.tasks,
    },
    { new: true }
  );

  res.status(200).json(result);
};

module.exports = dragTask;
