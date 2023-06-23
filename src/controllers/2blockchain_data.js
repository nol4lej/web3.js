import { web3 } from "./1connection.js";

// Función para manejar el evento newBlockHeaders
function handleNewBlockHeaders(blockHeader) {
    const current_block = document.getElementById("current_block");
    const block_miner = document.getElementById("block_miner");
    const hash_block = document.getElementById("hash_block");
    const gas = document.getElementById("gas");
    const copy_miner = document.getElementById("copy_miner")
    const copy_hash = document.getElementById("copy_hash")
    const { number, hash, miner, gasUsed } = blockHeader;

    current_block.textContent = number;
    block_miner.textContent = miner.slice(0, -36)+"..."+miner.slice(-4);
    hash_block.textContent = hash.slice(0, -60)+"..."+hash.slice(-4);
    gas.textContent = gasUsed;


    // navigator.clipboard.writeText no funciona si la conexion no es segura.
    copy_miner.addEventListener("click", () => {
        navigator.clipboard.writeText(miner)
        const copied_miner = document.getElementById("copied_miner");
        copied_miner.classList.add("active")
        setTimeout(function() {
            copied_miner.classList.remove('active');
          }, 1000);
    })
    copy_hash.addEventListener("click", () => {
        navigator.clipboard.writeText(hash)
        const copied_hash = document.getElementById("copied_hash");
        copied_hash.classList.add("active")
        setTimeout(function() {
            copied_hash.classList.remove('active');
          }, 1000);
    })

}

function blocksEvent(){
    // Suscribirse al evento newBlockHeaders
    web3.eth.subscribe('newBlockHeaders')
    .on('data', blockHeader => {
        console.log(blockHeader)
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
            console.log(blockHeader)
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