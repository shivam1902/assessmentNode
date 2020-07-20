const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();
app.use(cors());

const Router = require("./routes/index");

//DB Config
const db = require("./config/keys").MongoURI;

//connect mongo
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongodb Connected........."))
  .catch((err) => console.log(err));

//middelware
app.use(express.json({ limit: "50mb", extended: true }));

//Routes;
app.use("/", Router);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server starts on port ${PORT} `));
