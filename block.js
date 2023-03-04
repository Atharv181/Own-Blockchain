class Block{
    constructor({timestamp,prevHash,hash,data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }
}

const block1 = new Block({timestamp:'1234',prevHash:'0xabc',hash:'0xdef',data:'Hello World'});
console.log(block1);