const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config/keys");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader !== undefined) {
    jwt.verify(
      req.headers["authorization"].split(" ")[1],
      config.secret,
      (err, decoded) => {
        if (err) {
          err = new Error("Authorization Failed");
          err.status = 401;
          next(err);
        }
        User.findOne({
          where: {
            uuid: decoded.data.id,
            existence: true,
          },
        })
          .then((data) => {
            if (!data) {
              err = new Error("Authorization Failed");
              err.status = 401;
              next(err);
            } else {
              req.authData = decoded.data;
              next();
            }
          })
          .catch((err) => {
            err = new Error("User not in Database");
            err.status = 401;
            next(err);
          });
      }
    );
  } else {
    err = new Error("Forbidden");
    err.status = 403;
    next(err);
  }
};

const signToken = (data) => {
  return jwt.sign(
    {
      data: {
        id: data.uuid,
      },
    },
    config.secret
  );
};

module.exports = {
  signToken,
  verifyToken,
};
