const { model, Schema } = require("mongoose");

const BatchSchema = new Schema(
  {
    batchcode: {
      type: String,
    },
    subject: {
      type: String,
    },
    course: {
      type: String,
    },
    branch: {
      type: String,
    },
    date_time: {
      type: String,
    },
    trainer: {
      type: String,
    },
    tracker: {
      type: String,
    },
    addstudents: {
      type: [{}],
    },
  },
  { timestamps: true }
);

module.exports = model("Batches", BatchSchema);
