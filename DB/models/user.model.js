const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
  userType: {
    type: String,
    lowercase: true,
    enum: ["user", "admin"],
    default: "user",
  },
  borrowedBooks: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      borrowedDate: {
        type: Date,
        default: Date.now,
      },
      returnedDate: {
        type: Date,
      },
    },
  ],
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};

userSchema.statics.loginMe = async (email, password) => {
  const userData = await userModel.findOne({ email: email });
  if (!userData) throw new Error("invalid email");
  const matched = await bcrypt.compare(password, userData.password);
  if (!matched) throw new Error("invalid password");
  return userData;
};
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTKEY);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
