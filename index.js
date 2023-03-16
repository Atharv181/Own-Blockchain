const express = require('express');
const bodyparser = require('body-parser');
const Blockchain = require('./blockchain');
const PubSub = require('./publishsubscribe');
const request = require('request');

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub(({blockchain}));

const DEFAULT_PORT = 3000;
setTimeout(() => pubsub.brodcastChain(),1000);


app.use(bodyparser.json());
app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain);
})

app.post('/api/mine',(req,res) =>{
    const {data} = req.body;

    blockchain.addBlock({data});
    pubsub.brodcastChain();
    res.redirect('/api/blocks');
})

const syncChains = () => {
    
    const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;
    const url = `${ROOT_NODE_ADDRESS}/api/blocks`; 
    request(
        url,
        (error, response, body) => {
            console.log("Error: ", error);
            console.log("Response: ", response);
            if(!error && response.statusCode === 200){
                console.log("inside if")
                const rootChain = JSON.parse(body);
                console.log("Replace chain on sync with ", rootChain);
                blockchain.replaceChain(rootChain);
            }
        }
    );
};


let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT,() =>{
    console.log(`Listening on port ${PORT}`);
    syncChains();
});