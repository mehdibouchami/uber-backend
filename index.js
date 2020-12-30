const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const mapsRouter = require('./routes/maps');
const contrUser = require('./controllers/user');
const { request } = require('express');
var cors =  require('cors')

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/uber', {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cors());
app.post('/api/login', contrUser.login);
app.use('/api/user', userRouter);
app.use('/api/maps', mapsRouter);
app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});