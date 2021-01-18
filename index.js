const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const taxiRouter = require('./routes/taxi');
const mapsRouter = require('./routes/maps');
const contrUser = require('./controllers/user');
const { request } = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
var cors =  require('cors')

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/uber', {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cors());
app.post('/api/login', contrUser.login);
app.use('/api/user', userRouter);
app.use('/api/maps', mapsRouter);
app.use('/api/taxi', taxiRouter);

let interval = [];

io.on("connection", (socket) => {
  console.log("New client connected "+socket.id);
  if (interval[socket.id]) {
    clearInterval(interval[socket.id]);
  }
  interval[socket.id] = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected "+socket.id);
    clearInterval(interval[socket.id]);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
http.listen(port, () => {
    console.log('Server app listening on port ' + port);
});