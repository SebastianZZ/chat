const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connect',(socket) =>{
  console.log('New user');

  socket.on('createMessage',(message) => {
    console.log('New message !! :',message);
  });
  socket.emit('newMessage',{
    from:'stev',
    text:'Bierz sie do roboty gnoju',
    crateAT:1111111
  });
  socket.emit('newEmail',{
    from:'seb@op.pl',
    text:'Hello moto',
    createAT:123
  });
  socket.on('disconnect',() =>{
    console.log('User disconnected')
  });
});


server.listen(port,() =>{
  console.log(`Server is up on ${port}`);
});
