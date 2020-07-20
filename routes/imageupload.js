const multer = require("multer");
const Image = require("../models/Images");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    Image.create({
      userid: file.originalname,
      imageName: "/upload" + file.originalname,
    })
      .then((user) => {
        req.user = user;
        cb(null, file.fieldname + "-" + Date.now() + file.originalname);
      })
      .catch((err) => {
        cb(err, null);
      });
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");
const imageUpload = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(404).json("Somthing went worng");
    }
    return res.status(200).json("done");
  });
};

module.exports = { imageUpload };
