const { model, Schema } = require("mongoose");

const MessagesSchema = new Schema(
  {
    conerstionId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("MessagesSchema", MessagesSchema);
