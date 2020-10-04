const argon2 = require('argon2');
const {randomBytes} = require('crypto');
const user = require('../../models/user');

exports.register = async (req, res) => {
    const {
        username,
        password,
        email,
    } = req.body;
    const salt = randomBytes(32);

    const new_user = new user({
        username: username.toLowerCase(),
        email,
        password: await argon2.hash(password, {salt}),
        salt: salt.toString("hex"),
    });

    new_user
        .save()
        .then((registerUser) => {
            res.status(200).send({status: true, redirect: "/login"});
        })
        .catch((err) => {
            res.status(200).send({
                status: false,
                message: "Registration Unsuccessful. Try Again",
            });
        });
};
