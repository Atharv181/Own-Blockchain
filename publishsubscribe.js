const redis = require('redis');

const CHANNELS ={
    TEST:'TEST'
}

class PubSub{
    constructor(){
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.on('message',(channel,message) =>{
            console.log(message);
        })
    }
}

// const check = new PubSub();
// setTimeout(
//     () => check.publisher.publish(CHANNELS.TEST,"HELLLO"),
//     1000
    
// );