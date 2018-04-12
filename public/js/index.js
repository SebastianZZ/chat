var socket = io();

socket.on('connect',function() {
  console.log('connected !');

});
socket.on('disconnect',function()  {
  console.log('Disconnected from the server ');
});

socket.on('newMessage',function(message){
  console.log('Nowa wiadomosc milordzie : ',message);
});
