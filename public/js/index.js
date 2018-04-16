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
socket.emit('createMessage',{
  from:'Seb',
  text:'hi'
},function(data){
  console.log('ok msg:',data);
});

jQuery('#message-form').on('submit',function (e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){

  });
});
