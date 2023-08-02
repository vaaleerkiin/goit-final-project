const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (verefyId) => (req, res, next) => {
  if (!isValidObjectId(req.params[verefyId])) {
    next(HttpError(400, `${req.params[verefyId]} is not valid id`));
  }
  next();
};

module.exports = isValidId;
