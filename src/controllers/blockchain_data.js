import { web3 } from "./connections.js";

// Función para manejar el evento newBlockHeaders
function handleNewBlockHeaders(blockHeader) {
    const blockNumber = blockHeader.number;
    const hash = blockHeader.hash;
    const gasUsed = blockHeader.gasUsed;
    const miner = blockHeader.miner;
    console.log(blockNumber);
    console.log("Block hash:",hash)
    console.log("Gas:", gasUsed)
    console.log("Miner:", miner);
  }
  

function blocksEvent(){
    // Suscribirse al evento newBlockHeaders
    web3.eth.subscribe('newBlockHeaders', (error, result) => {
        if (error) {
            console.error('Error al suscribirse al evento newBlockHeaders:', error);
        };
    })
        .on('data', handleNewBlockHeaders)
        .on('error', error => {
            console.error('Error en el evento newBlockHeaders:', error);
        });
}


export {blocksEvent};