const { Board } = require("../../models/board");

const deleteBoard = async (req, res, next) => {
  const { boardId } = req.params;
  await Board.findByIdAndDelete(boardId);

  res.status(200).json({ message: "board deleted", boardId });
};

module.exports = deleteBoard;
