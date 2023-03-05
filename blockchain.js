const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain =[Block.genesis()];
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length-1],     
            data:data
        });

        this.chain.push(newBlock);
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({data:"King"});
console.log(blockchain);

module.exports = Blockchain;