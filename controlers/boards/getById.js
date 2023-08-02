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

  res.status(200).json(...result);
};

module.exports = getById;
