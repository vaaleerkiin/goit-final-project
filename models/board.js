const { Schema, model } = require("mongoose");
const Joi = require("joi");

const boardSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    columns: { type: Array, default: [] },
    background: {
      type: String,
      enum: [
        "bg-1",
        "bg-2",
        "bg-3",
        "bg-4",
        "bg-5",
        "bg-6",
        "bg-7",
        "bg-8",
        "bg-9",
        "bg-10",
        "bg-11",
        "bg-12",
        "bg-13",
        "bg-14",
        "bg-15",
        "bg-16",
        "bg-17",
        "bg-18",
      ],
      required: true,
    },
    icon: {
      type: String,
      enum: [
        "icon-1",
        "icon-2",
        "icon-3",
        "icon-4",
        "icon-5",
        "icon-6",
        "icon-7",
        "icon-8",
      ],
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },

  { versionKey: false, timestamps: true }
);

const createShema = Joi.object({
  name: Joi.string().required(),
  background: Joi.string().required(),
  icon: Joi.string().required(),
});

const editShema = Joi.object({
  name: Joi.string().required(),
  background: Joi.string().required(),
  icon: Joi.string().required(),
});

const shemas = { createShema, editShema };
const Board = model("board", boardSchema);

module.exports = { Board, shemas };
