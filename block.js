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
  static mineBlock(prevBlock, data){
    const timestamp = Date.now();
    const prevHash = prevBlock.hash;
    return new Block({
        timestamp,
        prevHash,
        data,
        hash:cryptoHash(timestamp,prevHash,data)
    })
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

const result = Block.mineBlock(genesisBlock,"Bobade");
console.log(result)
//console.log(block1);

