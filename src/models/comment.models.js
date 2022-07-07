const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cake: {
      type: Schema.Types.ObjectId,
      ref: "Cake",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
