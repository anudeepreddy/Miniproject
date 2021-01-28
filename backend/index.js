const router = require("express").Router();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRoute = require("./controllers/auth");
const workspaceRouter = require('./controllers/workspace');
const userRouter = require('./controllers/user');
const {verifyToken} = require('./services/jwt');

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
router.use("/usr",userRouter);
router.use("/user", authRoute);
router.use(verifyToken);
router.use('/workspace',workspaceRouter);

module.exports = router;
