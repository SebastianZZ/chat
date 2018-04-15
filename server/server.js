const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const generateMessage = require('./utils/message').generateMessage;

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connect',(socket) =>{
  console.log('New user connected');

  socket.emit('newMessage',  generateMessage('Admin','Welcome to chat app my son '));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined the room , be aware'));

  socket.on('createMessage',(message) => {
    console.log('New message !! :',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect',() =>{
    console.log('User disconnected')
  });
});


server.listen(port,() =>{
  console.log(`Server is up on ${port}`);
});
