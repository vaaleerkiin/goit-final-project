const { Column } = require("../../models/column");

const editTask = async (req, res, next) => {
  const { taskId } = req.params;

  const { title, description, labelColor, deadLine } = req.body;
  await Column.updateOne(
    {
      tasks: { $elemMatch: { _id: taskId } },
    },
    {
      $set: {
        "tasks.$[element].title": title,
        "tasks.$[element].description": description,
        "tasks.$[element].labelColor": labelColor,
        "tasks.$[element].deadLine": deadLine,
      },
    },
    {
      arrayFilters: [{ "element._id": taskId }],
    }
  );

  const column = await Column.findOne({
    tasks: { $elemMatch: { _id: taskId } },
  });

  res.status(201).json({
    title,
    description,
    labelColor,
    deadLine,
    _id: taskId,
    columnId: column._id,
  });
};

module.exports = editTask;
