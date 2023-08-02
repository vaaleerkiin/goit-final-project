const { Column } = require("../../models/column");

const dragTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { columnId, indexFrom, indexTo } = req.body;
  console.log(1);
  const data = await Column.findOne({
    tasks: { $elemMatch: { _id: taskId } },
  });
  console.log(2);

  const currnetTask = data.tasks[indexFrom];
  data.tasks.splice(indexFrom, 1);

  console.log(currnetTask);

  await Column.findByIdAndUpdate(
    data._id,
    { tasks: data.tasks },
    { new: true }
  );
  console.log(5);

  const tasks = await Column.findById(columnId);

  tasks.tasks.splice(indexTo, 0, currnetTask);

  console.log(6);

  const result = await Column.findByIdAndUpdate(
    columnId,
    {
      tasks: tasks.tasks,
    },
    { new: true }
  );
  console.log(7);
  res.status(200).json(result);
};

module.exports = dragTask;
