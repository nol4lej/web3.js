// Importa la biblioteca Web3.js - Solo se puede importar al utilizar node.js
// const Web3 = require('web3');

export async function connectNetwork(){
    try {
        await connecting()
        console.log("Connected to Infura")
    } catch (error) {
        console.error("Cannot connect to provide: ", error)
    }
    connectWallet()
}

function connecting(){
    return new Promise((resolve, reject) => {
        // Conecta a la red de Ethereum utilizando una instancia de Web3.
        const web3 = new Web3("https://mainnet.infura.io/v3/8ad95f4599574970894aa39f5b84fe5b");
        resolve();
    })
}

async function connectWallet(){
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account)
}

class User{
    constructor(id, wallet){
        this.id = id;
        this.wallet = wallet;
    }
}

