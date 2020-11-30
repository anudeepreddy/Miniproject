const router = require("express").Router();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRoute = require("./controllers/auth");

mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (error) => {
    if (!error) console.log("Established Connection to DB");
    else console.log(error);
  }
);

router.use("/user", authRoute);
module.exports = router;
