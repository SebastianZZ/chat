var socket = io();

socket.on('connect',function() {
  console.log('connected !');
});
socket.on('disconnect',function()  {
  console.log('Disconnected from the server ');
});

socket.on('newMessage',function(message){
  console.log('Nowa wiadomosc milordzie : ',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('msgListOnConnect',(msg)=>{
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);

  jQuery('#messages').append(li);
})
jQuery('#message-form').on('submit',function (e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){

  });
});
