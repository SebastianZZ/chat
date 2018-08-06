const MongoClient = require('mongodb').MongoClient;

const addMsg = (msg) =>{
  return new Promise((resolve,reject) =>{

      MongoClient.connect('mongodb://localhost:27017/Messages',{useNewUrlParser:true},(err,client) =>
      {
          if(err){
            reject('Unable to connect to MongoDB server');
          }

          let db = client.db('Messages');
          db.collection('messages').insertOne(msg,(err,result) => {
              if(err){
                reject('Unable to add a message to database');
              }
              resolve(result);
          });
          client.close();
      });
  });
};

const getAllMessages = () =>{
  return new Promise((resolve,reject) =>{

      MongoClient.connect('mongodb://localhost:27017/Messages',{useNewUrlParser:true},(err,client) =>
      {
          if(err){
            reject('Unable to connect to MongoDB server');
          }

          let db = client.db('Messages');
          let msgsArr = db.collection('messages').find().toArray();
          resolve(msgsArr);
          client.close();
  });
});
};

module.exports.addMsg = addMsg;
module.exports.getAllMessages = getAllMessages;
