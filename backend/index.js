const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');
const authRoute = require('./controllers/auth');

const app = express();

const corsOptions = {
    orgin: '*',
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200
};

mongoose.connect(
    keys.mongoURI,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true},
    (error) => {
        if (!error) console.log('Established Connection to DB');
        else console.log(error);
    }
);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/user', authRoute);

app.listen(keys.port, () => console.log(`Listening on port:${keys.port}`));
