const db = require('./db');
const generateMessage = require('./message').generateMessage;

module.exports = (io) =>{

  io.on('connect',(socket) =>{
    console.log('New user connected');
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined the room , be aware'));

    //lets get all history msgs and show them on website

      db.getAllMessages().then((result) => {
        for(var i=0; i<result.length;i++){
          socket.emit('msgListOnConnect',result[i]);
        }
      },(reject) => {
        console.log(reject);
      });


    //acction on createMessage event that will come from website
    socket.on('createMessage',(message) => {
      let newMessage = generateMessage(message.from,message.text);
      io.emit('newMessage',newMessage);
      //add message to database
      db.addMsg(newMessage).then((result) =>{
        console.log('Message added successfully');
        console.log(JSON.stringify(result.ops));
      },(reject) =>{
        console.log(reject);
      });
    });

    //on user disconnect
    socket.on('disconnect',() =>{
      console.log('User disconnected')
    });

  });

};
