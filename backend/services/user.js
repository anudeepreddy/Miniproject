const user = require('../models/user');

exports.search = async(req, res) => {
  console.log(req.query.s);
  const result = await user.find(
    {
      username: new RegExp(req.query.s,'i')
    },
    "username"
  );
  res.send({status: true, data: result});
}