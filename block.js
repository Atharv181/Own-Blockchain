const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./cryptoHash');

class Block {
  constructor({ timestamp, prevHash, hash, data }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis(){
    return new this(GENESIS_DATA);
  }
}

const block1 = new Block({
  timestamp: 1234,
  prevHash: "0xabc",
  hash: "0xdef",
  data: "Hello World",
});

const genesisBlock = Block.genesis();
//console.log(genesisBlock)

//console.log(block1);

