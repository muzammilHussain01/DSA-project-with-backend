const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  first_Name: { type: String, required: true },
  middle_Name: { type: String, required: true },
  last_Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  re_enter_email: { type: String, required: true },
  password: { type: String, required: true },
  confirm_password: { type: String, required: true },
  dob: { type: String, required: true },
  department: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }],
});

// JWT token generation
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

// Password hashing before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirm_password = await bcrypt.hash(this.confirm_password, 10);
  }
  next();
});

const SignupData = mongoose.model("SignupData", userSchema);
module.exports = SignupData;
