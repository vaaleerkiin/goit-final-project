const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const defaultAvatar =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Password is required"] },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      url: { type: String, default: defaultAvatar },
      width: { type: Number, default: 300 },
      height: { type: Number, default: 300 },
      format: { type: String, default: "jpg" },
      asset_id: { type: String, default: 0 },
      public_id: { type: String, default: 0 },
      created_at: { type: String, default: new Date() },
      original_filename: { type: String, default: "defaultAvatar" },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    boards: { type: Array, default: [] },
    theme: {
      type: String,
      enum: ["dark", "light", "violet"],
      default: "violet",
    },
  },

  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

const registerShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginShema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const editShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string(),
  avatar: Joi.string(),
});

const updateThemeSchema = Joi.object({
  theme: Joi.string().valid("dark", "light", "violet").required(),
});

const verifyShema = Joi.object({
  email: Joi.string().required(),
});

const helpShema = Joi.object({
  email: Joi.string().required(),
  text: Joi.string().required(),
});

const shema = {
  registerShema,
  loginShema,
  updateThemeSchema,
  verifyShema,
  editShema,
  helpShema,
};

module.exports = { shema, User, defaultAvatar };
