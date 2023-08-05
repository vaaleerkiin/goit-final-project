const { Schema, model } = require("mongoose");

const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const ColumnSchema = new Schema(
  {
    name: { type: String, required: true },
    tasks: [
      {
        title: { type: String },
        description: { type: String },
        labelColor: {
          type: String,
          enum: ["without", "low", "medium", "high"],
        },
        deadLine: { type: Date, required: true },
        _id: { type: Schema.ObjectId },
      },
    ],
    boardId: { type: Schema.Types.ObjectId, ref: "boards", required: true },
  },

  { versionKey: false, timestamps: true }
);

ColumnSchema.post("save", handleMongooseError);
const Column = model("column", ColumnSchema);

const dragShema = Joi.object({
  columnId: Joi.string().required(),
  indexTo: Joi.number().required(),
  indexFrom: Joi.number().required(),
});

const createShema = Joi.object({
  name: Joi.string().required(),
});

const editShema = Joi.object({
  name: Joi.string().required(),
});

const createTaskShema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  labelColor: Joi.string()
    .valid("Without priority", "Low", "Medium", "High")
    .required(),
  deadLine: Joi.date().required(),
});

const editTaskShema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  labelColor: Joi.string()
    .valid("Without priority", "Low", "Medium", "High")
    .required(),
  deadLine: Joi.date().required(),
});

const shemas = {
  dragShema,
  createShema,
  editShema,
  createTaskShema,
  editTaskShema,
};

module.exports = { Column, shemas };
