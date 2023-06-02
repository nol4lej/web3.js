// Importa la biblioteca Web3.js - Solo se puede importar al utilizar node.js
// const Web3 = require('web3');
import { executeLastBlockAndEvent } from "./blockchain_data.js";
import { connectWallet, connect_button } from "./accounts.js" // CONECTAR WALLET PASO 1
let web3; // scope global para posterior a darle valor poder exportar y reutilizar. 

async function connectNetwork(){
    await connecting();
    executeLastBlockAndEvent();
    await verifyProvider();
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
        if(window.ethereum){
            connect_button.onclick = connectWallet; // CONECTAR WALLET PASO 2
            resolve()
        } else{
            connect_button.textContent = "Install Wallet Provider"
            // Desactivo reject para que no interrumpa a la funcion connectNetowrk() en caso no tener proveedor.
            // reject(console.error("Instalar un proveedor."))
        }
    })
}

export {web3, connectNetwork};


