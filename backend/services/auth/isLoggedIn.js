const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

exports.isLoggedIn = async (req, res) => {
    if(req.headers.authorization&&req.headers.authorization.split(' ')[0]==='Bearer'){  
    var token =  req.headers.authorization.split(' ')[1];
      jwt.verify(token, keys.jwtSecretToken, (err, tokenData) => {
      if(err && err.name === 'TokenExpiredError') {
          return res.json({status: false});
      }
      if(err) {
          return res.json({status: false});
      }
      res.json({status:true});
  });}
  else{
      res.json({status:false});
  }
}
