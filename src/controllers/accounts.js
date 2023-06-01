// const fs = require('fs');
import { web3 } from "./connections.js";

const connect_button = document.getElementById("connect_wallet");
let currentAccount = null; // Se utiliza en connectWallet para almacenar la wallet que se conecta y posteriormente se utiliza en handleAccountsChanged para manejar la actualización de la wallet conectada actual.
let accounts = []; // Creado para acceder a la cuenta conectada actual. Se utiliza en handleAccountsChanged.

class User{
    constructor(id, wallet){
        this.id = id;
        this.wallet = wallet;
    }

    addUser(id, wallet){
        const nuevo = new User(id, wallet);
        const nuevoJSON = JSON.stringify(nuevo, null, 2);
        console.log(nuevoJSON)
    }
}


// PASO 1
async function connectWallet(){
    const account_connected = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    currentAccount = account_connected[0]
            
    fetch('../../users.json')
    .then(data => data.json())
    .then(respuesta => {
        // PASO 2
        controllerUsers(respuesta, currentAccount);
    })
}

// PASO 3
async function controllerUsers(respuesta, account){
    // PASO 4
    await verifyAccount(respuesta, account);
    const new_user = new User();
    new_user.addUser(respuesta.length + 1, account)
}

// PASO 5
function verifyAccount(array, account){
    return new Promise((resolve, reject) => {
        array.forEach(user => {
            if(user.wallet === account){
                reject(`Wallet ya existe:\nID: ${user.id}\nWallet: ${account}`)
            }
        });
        resolve()
    })

}

async function getBalance(account){
    // Al utilizar web3.eth.getBalance(account), estás realizando una consulta directamente a la blockchain para obtener el saldo de una cuenta específica.
    // Realiza una llamada al proveedor de Ethereum (como un nodo local o un servicio de nodo remoto) y solicita el saldo de la cuenta indicada en la red Ethereum en la que estés conectado.
    // El resultado es en wei.
    const balance = await web3.eth.getBalance(account);

    // En el metodo "window.ethereum.request", es importante tener en cuenta que la respuesta obtenida mediante depende del proveedor de Ethereum utilizado (como Metamask) y de la red Ethereum en la que estás conectado.
    // El resultado es en hexadecimal.
    // const balance_hex = await window.ethereum.request({
    //     method: 'eth_getBalance',
    //     params: [account]
    //   });
    
    const balance_legible = web3.utils.fromWei(balance, 'ether'); //Conversion del resultado hexadecimal a numero entero y aplicar el factor de conversion (wei a ether)
    console.log(balance_legible)
}

// Evento que detecta y reacciona al cambio de cuenta en la wallet (accountsChanged).
window.ethereum.on('accountsChanged', handleAccountsChanged);

// El parámetro accounts en handleAccountsChanged es el resultado enviado automáticamente cuando se produce el evento 'accountsChanged' o cuando se resuelve la promesa de eth_accounts.
function handleAccountsChanged(newAccount) {
    accounts = newAccount; //Reasignamos el valor del array accounts con el nuevo array obtenido
    // accounts contiene el array de cuentas actualizadas obtenido por el metodo "eth_accounts".
    if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];

        getBalance(currentAccount)
        console.log(currentAccount)
    }
}

window.ethereum.request({ method: 'eth_accounts' })
    .then((newAccount) => {
        accounts = newAccount;
        handleAccountsChanged(accounts);
    }) // Cuando se resuelve la promesa, el resultado (array de cuentas) se pasa automáticamente como argumento a la función handleAccountsChanged.
    .catch((err) => {
        console.error(err);
    });


export {connectWallet, connect_button, currentAccount};