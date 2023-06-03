import { executeLastBlockAndEvent } from "./blockchain_data.js";

let web3; // scope global para posterior a darle valor poder exportar y reutilizar. 
let providerChecker; // boolean que se almacena si hay o no Ethereum provider.
const connect_button = document.getElementById("connect_wallet");

async function connectNetwork(){
    await connecting();
    executeLastBlockAndEvent();
    await verifyProvider()
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

function verifyProvider(){
    return new Promise((resolve, reject) => {
        if(!window.ethereum){
            connect_button.textContent = "Install Wallet Provider";
            providerChecker = false;
        }
    })
}

connectNetwork()

export {web3, connect_button, providerChecker};


