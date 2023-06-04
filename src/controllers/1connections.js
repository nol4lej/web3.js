import { executeLastBlockAndEvent } from "./2blockchain_data.js";

let web3; // scope global para posterior a darle valor poder exportar y reutilizar. 

async function connectNetwork(){
    await connecting();
    executeLastBlockAndEvent();
}

function connecting(){
    return new Promise((resolve, reject) => {
        web3 = new Web3("wss://moonbeam-alpha.api.onfinality.io/public-ws");
        // Verifica si la conexión es válida
        web3.eth.net.isListening()
        .then(() => {
            const current_blockchain = document.getElementById("current_blockchain");
            current_blockchain.classList.add("active");
            current_blockchain.textContent = "Connected to Moonbase";
            resolve();
        })
        .catch(error => {
            reject(error.message);
        });
    })
}

connectNetwork()

export {web3, connecting};
// Se exporta connecting para importar en 3accounts.js y esperar la promesa de connecting, si la promesa rechaza, no permite conectar la wallet.


