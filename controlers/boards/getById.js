const { Board } = require("../../models/board");
const { ObjectId } = require("mongodb");
const getById = async (req, res, next) => {
  const { boardId } = req.params;

  const objectId = new ObjectId(boardId);
  const result = await Board.aggregate([
    {
      $match: {
        _id: objectId,
      },
    },
    {
      $lookup: {
        from: "columns",
        localField: "_id",
        foreignField: "boardId",
        as: "columns",
      },
    },
  ]);
  result[0].columns.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB;
  });

  res.status(200).json(...result);
};

module.exports = getById;
