import { executeLastBlockAndEvent } from "./2blockchain_data.js";

let web3; // scope global para posterior a darle valor poder exportar y reutilizar. 

async function connectNetwork(){
    await connecting();
    executeLastBlockAndEvent();
}

function connecting(){
    return new Promise((resolve, reject) => {
        web3 = new Web3("wss://wss.api.moonbase.moonbeam.network");
        // Verifica si la conexión es válida
        web3.eth.net.isListening()
        .then(() => {
            document.getElementById("current_blockchain").textContent = "Connected to Moonbase";
            resolve();
        })
        .catch(error => {
            reject(error);
        });
    })
}

connectNetwork()

export {web3};


