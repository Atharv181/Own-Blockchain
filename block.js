const {GENESIS_DATA , MINE_RATE} = require('./config');
const cryptoHash = require('./cryptoHash');
const hexToBinary = require('hex-to-binary');

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
    let difficulty = prevBlock.difficulty;

    let nonce =0;
    do{
        nonce++;
        timestamp = Date.now();
        difficulty = Block.adjustDifficulty({
            lastBlock: prevBlock,
            timestamp,
        })
        hash = cryptoHash(timestamp,prevHash,data,nonce,difficulty);
    }while(hexToBinary(hash).substring(0,difficulty) !== '0'.repeat(difficulty));
    return new Block({
        timestamp,
        prevHash,
        data,
        hash,
        difficulty,
        nonce,
    });
  }

  static adjustDifficulty({lastBlock,timestamp}){
    const { difficulty } = lastBlock;
    if(difficulty < 1) return 1;
    const difference = timestamp - lastBlock.timestamp;
    if(difference > MINE_RATE){
        return difficulty - 1;
    }
    return difficulty + 1;
  }
}

const genesisBlock = Block.genesis();
//console.log(genesisBlock)

// const result = Block.mineBlock({prevBlock:genesisBlock,data:"Bobade"});
// console.log(result);
// console.log(block1);

module.exports = Block;

