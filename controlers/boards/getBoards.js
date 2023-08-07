const { Board } = require("../../models/board");

const getBoards = async (req, res, next) => {
  const result = await Board.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(201).json(result);
};

module.exports = getBoards;
