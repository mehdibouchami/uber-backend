const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const contrUser = require('./controllers/user');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/uber', {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.post('/api/login', contrUser.login);
app.use('/api/user', userRouter);
app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});