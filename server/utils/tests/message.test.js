let chai = require('chai');
let expect = chai.expect;
let {generateMessage} = require('./../message');

describe('generateMessage',() =>{
  it('should generate correct message object',() =>{
    let msg = generateMessage('sebulba','Test msg');
    expect(msg).to.have.property('text');
    expect(msg).to.have.property('from');
    expect(msg).to.have.property('createdAt');
    expect(msg.text).to.be.an('string');
    expect(msg.from).to.be.an('string');
    expect(msg.createdAt).to.be.an('number');
    expect(msg.text).to.be.equal('Test msg');
    expect(msg.from).to.be.equal('sebulba');
  });
});
