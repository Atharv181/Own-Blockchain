const redis = require('redis');

const CHANNELS ={
    TEST:'TEST',
    BLOCKCHAIN: 'blockchain'
}

class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);


        this.subscriber.on('message',(channel,message) =>{
            this.handleMessage(channel,message);
        });
    }
    handleMessage(channel,message){
        console.log(`Message recieved. Channel: ${channel} Message: ${message}`);
        const parseMessage = JSON.parse(message);
        if(channel === CHANNELS.BLOCKCHAIN){
            this.blockchain.replaceChain(parseMessage);
        }
    }
    publish({channel,message}){
        this.publisher.publish(channel,message);
    }
    brodcastChain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain),
        });
    }
}

// const check = new PubSub();
// setTimeout(
//     () => check.publisher.publish(CHANNELS.TEST,"HELLLO"),
//     1000
    
// );

module.exports = PubSub;