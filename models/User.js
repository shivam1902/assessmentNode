const mongoose = require("mongoose");
const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  existance: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("TaskAssessment", User);
