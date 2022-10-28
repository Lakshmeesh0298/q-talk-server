const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../../config");

const StudentSchema = new Schema(
  {
    username: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    batchcode: {
      type: [],
    },
  },
  { timestamps: true }
);

// StudentSchema.pre("save", async () => {
//   let crypted = await bcrypt.genSalt(20);
//   this.password = await bcrypt.hash(this.password, crypted);
// });
// StudentSchema.methods.regToken = () => {
//   return jwt.sign({ id: this.id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
// };

// StudentSchema.methods.matchPASSWORD = async function (enteredPassword) {
//   console.log(enteredPassword, this.password);
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = model("students", StudentSchema);
