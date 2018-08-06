const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const socket = require('./utils/socket');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const db = require('./utils/db');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
socket(io);

server.listen(port,() =>{
  console.log(`Server is up on ${port}`);
});
