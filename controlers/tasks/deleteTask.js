const { HttpError } = require("../../helpers");
const { Column } = require("../../models/column");

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;

  const result = await Column.findOneAndUpdate(
    {
      tasks: { $elemMatch: { _id: taskId } },
    },
    {
      $pull: { tasks: { _id: taskId } },
    }
  );

  if (!result) {
    throw HttpError(404, "task not found");
  }
  const { _id: columnId } = result;

  res.status(200).json({ message: "task deleted", columnId, taskId });
};

module.exports = deleteTask;
