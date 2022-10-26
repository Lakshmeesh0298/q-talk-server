const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../../config");

const AuthSchema = new Schema(
  {
    username: {
      type: String,
    },
    phonenumber: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["trainer", "publisher", "admin"],
      default: "trainer",
    },
  },
  { timestamps: true }
);

AuthSchema.pre("save", async () => {
  let crypted = await bcrypt.genSalt(20);
  this.password = await bcrypt.hash(this.password, crypted);
});
AuthSchema.methods.regToken = () => {
  return jwt.sign({ id: this.id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

AuthSchema.methods.matchPASSWORD = async function (enteredPassword) {
  console.log(enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model("auths", AuthSchema);
