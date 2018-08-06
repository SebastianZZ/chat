let chai = require('chai');
let expect = chai.expect;
let db = require('./../db.js');

describe('db operations',() =>{

  it('Should fetch all messages ',(done) =>{
    db.getAllMessages().then((result) =>{
      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
      expect(result[0]).to.have.property('_id');
      expect(result[0]).to.have.property('from');
      expect(result[0]).to.have.property('text');
      done();
    });
  });

  it('Should add msg to db ',(done) =>{
    let message = {
      from:'User',
      text:'Test message',
      createdAt:new Date().getTime()
    }
    db.addMsg(message).then((msg) =>{
          expect(msg.ops).to.be.an('array');
          expect(msg.ops[0]).to.have.property('from');
          expect(msg.ops[0]).to.have.property('text');
          expect(msg.ops[0]).to.have.property('createdAt');
          expect(msg.ops[0]).to.have.property('_id');
          done();
    });
  });
  
});
