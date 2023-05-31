// Importa la biblioteca Web3.js - Solo se puede importar al utilizar node.js
// const Web3 = require('web3');

import { connectWallet } from "./accounts.js" // CONECTAR WALLET PASO 1
const connect_button = document.getElementById("connect_wallet"); // CONECTAR WALLET PASO 2

let web3; //declaramos para posteriormente exportar

export async function connectNetwork(){
    await connecting()
    console.log("Connected to Moonbeam Alpha")
    connect_button.onclick = connectWallet; // CONECTAR WALLET PASO 3
}

function connecting(){
    return new Promise((resolve, reject) => {
        web3 = new Web3("https://rpc.api.moonbase.moonbeam.network");
        // Verifica si la conexión es válida
        web3.eth.net.isListening()
        .then(() => {
            resolve();
        })
        .catch(error => {
            reject(error);
        });
    })
}

export { web3 };
