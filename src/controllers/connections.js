// Importa la biblioteca Web3.js - Solo se puede importar al utilizar node.js
// const Web3 = require('web3');

// import { connectWallet } from "./accounts.js"

let web3; //declaramos para posteriormente exportar

export async function connectNetwork(){
    try {
        await connecting()
        console.log("Connected to Moonbeam Alpha")
        // connectWallet()
    } catch (error) {
        console.error("Cannot connect to provide: ", error)
    }
    
}

function connecting(){
    return new Promise((resolve, reject) => {
        // Conecta a la red de Ethereum utilizando una instancia de Web3.
        web3 = new Web3("https://rpc.api.moonbase.moonbeam.network");
        resolve();
    })
}

export { web3 };