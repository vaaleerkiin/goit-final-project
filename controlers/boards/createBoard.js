const { Board } = require("../../models/board");

const createBoard = async (req, res, next) => {
  const result = await Board.create({ ...req.body, owner: req.user._id });
  res.status(201).json(result);
};

module.exports = createBoard;
