const mongoose = require("mongoose");
const Image = new mongoose.Schema({
  userid: {
    type: String,
  },
  imageName: {
    type: String,
  },
});

module.exports = mongoose.model("Images", Image);
