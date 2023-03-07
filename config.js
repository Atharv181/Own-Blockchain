const INITIAL_DIFFICULTY = 4;
const MINE_RATE = 10000; //10 sec

const GENESIS_DATA ={
    timestamp : 181,
    prevHash : '0x000',
    hash : '0x123',
    data:"Atharv",
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
};

module.exports = { GENESIS_DATA , MINE_RATE };