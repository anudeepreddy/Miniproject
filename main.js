const express = require("express");
const path = require("path");
const ApiRouter = require("./backend/index");
const bodyParser = require("body-parser");
const keys = require("./backend/config/keys");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});
const socketJwtAuth = require('socketio-jwt-auth');
const UserModel = require('./backend/models/user');
const initListeners= require('./backend/sockets');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));
app.use("/api", ApiRouter);
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

io.use(socketJwtAuth.authenticate({
      secret: keys.jwtSecretToken,
      algorithm: 'HS256'
    }, (payload, done)=>{
      console.log('------Printing Payload------')
      console.log(payload);
      UserModel.findById({_id: payload._id}, 'username', (err, user)=>{
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, 'user does not exist');
        }
        return done(null, user);
      });
    }
  )
);

initListeners(io);

server.listen(keys.port);