const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
