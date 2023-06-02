import { web3 } from "./connections.js";

const current_block = document.getElementById("current_block");
const block_miner = document.getElementById("block_miner");
const hash_block = document.getElementById("hash_block");
const gas = document.getElementById("gas");

// Función para manejar el evento newBlockHeaders
function handleNewBlockHeaders(blockHeader) {
    const { number, hash, miner, gasUsed } = blockHeader;

    current_block.textContent = number;
    block_miner.textContent = miner;
    hash_block.textContent = hash;
    gas.textContent = gasUsed;
}
  

function blocksEvent(){
    // Suscribirse al evento newBlockHeaders
    web3.eth.subscribe('newBlockHeaders')
    .on('data', blockHeader => {
      handleNewBlockHeaders(blockHeader);
    })
    .on('error', error => {
      console.error('Error en el evento newBlockHeaders:', error);
    });
}

function lastBlock(){
    return new Promise((resolve, reject) => {
        web3.eth.getBlock('latest')
        .then(blockHeader => {
            handleNewBlockHeaders(blockHeader);
            resolve()
        })
        .catch((error) => {
            console.error('Error al obtener el último bloque:', error);
        });
    })

}

function executeLastBlockAndEvent(){
    lastBlock()
    .then(() => {
        blocksEvent();
      })
    .catch((error) => {
        console.error('Error al ejecutar lastBlock y blocksEvent:', error);
    });
}

export {executeLastBlockAndEvent};