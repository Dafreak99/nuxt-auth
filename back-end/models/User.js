const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

// Hash plain text password before save user
UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.pre("updateOne", async function (next) {
  const data = this.getUpdate();

  data.password = await bcrypt.hash(data.password, 8);
  this.update({}, data).exec();
  next();
  next();
});

// Password will be cut out
UserSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  // built-in method
  delete userObject.password;

  return userObject;
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const res = await bcrypt.compare(candidatePassword, this.password);
  return res;
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
