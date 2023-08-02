const { Board } = require("../../models/board");

const editBoard = async (req, res, next) => {
  const { boardId } = req.params;
  const result = await Board.findByIdAndUpdate(boardId, req.body, {
    new: true,
  });
  res.status(201).json(result);
};

module.exports = editBoard;
