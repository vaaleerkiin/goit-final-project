const { Schema, model } = require("mongoose");

const Joi = require("joi");

const ColumnSchema = new Schema(
  {
    name: { type: String, required: true },
    tasks: [
      {
        title: { type: String },
        description: { type: String },
        labelColor: {
          type: String,
          enum: ["Without priority", "Low", "Medium", "High"],
        },
        deadLine: { type: Date, required: true },
        _id: { type: Schema.ObjectId },
      },
    ],
    boardId: { type: Schema.Types.ObjectId, ref: "boards", required: true },
  },

  { versionKey: false, timestamps: true }
);

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

const shemas = { dragShema, createShema, editShema, createTaskShema };

const Column = model("column", ColumnSchema);

module.exports = { Column, shemas };
