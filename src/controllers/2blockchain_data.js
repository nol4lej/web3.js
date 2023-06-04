import { web3 } from "./1connections.js";

const current_block = document.getElementById("current_block");
const block_miner = document.getElementById("block_miner");
const hash_block = document.getElementById("hash_block");
const gas = document.getElementById("gas");
const iconsArray = document.querySelectorAll("#copy_icon");

// Función para manejar el evento newBlockHeaders
function handleNewBlockHeaders(blockHeader) {
    const { number, hash, miner, gasUsed } = blockHeader;

    current_block.textContent = number;
    block_miner.textContent = miner.slice(0, -32)+"..."+miner.slice(-8);
    hash_block.textContent = hash.slice(0, -56)+"..."+hash.slice(-8);
    gas.textContent = gasUsed;

    // Recorre el array 
    iconsArray.forEach((icon) => {
        let idCopied;
        icon.style.display = "block";
        const copiedElement = document.querySelector(`.copied${idCopied}`)
        // console.log(copiedElement)
        // Si icon.name es igual a miner, entonces miner, sino hash.
        const id_value = icon.name === "miner" ? miner : hash;
        icon.addEventListener("click", () => {
            // El método writeText() de navigator.clipboard se utiliza para escribir texto en el portapapeles y este método devuelve una promesa.
            navigator.clipboard.writeText(id_value)
            .then(() => {
                copiedElement.style.display = "block";
                setTimeout(() => {
                    copiedElement.style.display = "none"; // Oculta el elemento "copied" después de 0.5 segundos
                }, 500);    
            })
            .catch((error) => {
                console.error("Error al copiar al portapapeles: ", error);
            });
        })
    });
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