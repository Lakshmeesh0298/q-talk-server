const { model, Schema } = require("mongoose");

const ConverstionSchema = new Schema(
  {
    members: {
      type: [],
    },
  },
  { timestamps: true }
);

module.exports = model("ConverstionSchema", ConverstionSchema);
