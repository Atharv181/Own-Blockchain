const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./cryptoHash');

class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis(){
    return new this(GENESIS_DATA);
  }
  static mineBlock({prevBlock, data}){
    let hash,timestamp;
    const prevHash = prevBlock.hash;
    const difficulty = prevBlock.difficulty;

    let nonce =0;
    do{
        nonce++;
        timestamp = Date.now();
        hash = cryptoHash(timestamp,prevHash,data,nonce,difficulty);
    }while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));
    return new Block({
        timestamp,
        prevHash,
        data,
        hash,
        difficulty,
        nonce,
    });
  }
}

const genesisBlock = Block.genesis();
//console.log(genesisBlock)

// const result = Block.mineBlock({prevBlock:genesisBlock,data:"Bobade"});
// console.log(result);
// console.log(block1);

module.exports = Block;

