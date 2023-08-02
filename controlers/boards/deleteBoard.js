const { Board } = require("../../models/board");

const deleteBoard = async (req, res, next) => {
  const { boardId } = req.params;

  const result = await Board.findByIdAndDelete(boardId);

  res.status(200).json(result);
};

module.exports = deleteBoard;
