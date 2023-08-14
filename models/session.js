const { Schema, model } = require("mongoose");

const sessionSchema = new Schema(
  {
    uid: { type: Schema.ObjectId, required: true },
  },
  { versionKey: false, timestamps: true }
);

const Session = model("Session", sessionSchema);

module.exports = { Session };
