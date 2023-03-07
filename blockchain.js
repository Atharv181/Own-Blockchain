const Block = require('./block');
const cryptoHash = require('./cryptoHash');

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

    replaceChain(chain){
        if(chain.length <= this.chain.length){
            console.error("The incoming chain is not longer");
            return;
        }
        if(!Blockchain.isValidChain(chain)){
            console.error("Incoming chain is not valid");
            return;
        }
        this.chain = chain;
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0]) != JSON.stringify(Block.genesis())){
            return false;
        }
        for(let i=1;i<chain.length;i++){
            const {timestamp,prevHash,hash,data,nonce, difficulty} = chain[i];
            const realLastHash = chain[i-1].hash;
            const validatedHash = cryptoHash(timestamp,data,prevHash,nonce,difficulty);

            if(prevHash !== realLastHash){
                return false;
            }

            if(hash !== validatedHash){
                return false;
            }
        }
        return true;
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({data:"King"});
blockchain.addBlock({data:"Kohli"});
console.log(blockchain);

// const result = Blockchain.isValidChain(blockchain.chain);
// console.log(result)

module.exports = Blockchain;