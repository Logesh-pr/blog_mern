import { Schema, model } from "mongoose";

//bcryptjs
import bcryptjs from "bcryptjs";

const userSchema = Schema(
  {
    name: { type: String, required: true, unique: true, minlength: 5 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timeStamp: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const saltRound = 10;

  this.password = await bcryptjs.hash(this.password, saltRound);
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    return ret;
  },
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    return bcryptjs.compare(userPassword, this.password);
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
const User = model("user", userSchema);

export default User;
