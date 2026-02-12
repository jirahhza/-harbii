const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  totalTime: { type: Number, default: 0 },
  sessions: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  isActive: { type: Boolean, default: false },
  loginTime: { type: Date }
});

module.exports = mongoose.model("User", userSchema);
