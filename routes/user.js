const User = require("../models/User");
const config = require("../config/keys");
const saltRounds = config.salt;
const bcrypt = require("bcrypt");

const signToken = require("../auth/token").signToken;

// ********************************Create User ******signup***************

const createUser = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, saltRounds, (err, salt) => {
    err ? err : salt;
  });
  User.create({
    email: req.body.email,
    password: hash,
    name: req.body.name,
    number: req.body.number,
  })
    .then((newUser) => {
      res.status(201).json({
        status: "success",
        data: {
          userInfo: newUser,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    });
};
// ***********************************SignIn***************

const signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        if (user.status === true && user.existance === true) {
          const token = signToken(user._id);
          res.status(200).json({
            message: "Login Successful!",
            token,
            userId: user._id,
          });
        } else if (user.status === false && user.existence === true) {
          res.json({ message: "User is blocked" });
        } else {
          res.json({
            message: "User record missing",
          });
        }
      } else {
        res.status(404).json({ message: "User not in database" });
      }
    })
    .catch((err) => {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    });
};
module.exports = { createUser, signin };
