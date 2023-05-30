// const fs = require('fs');
import { web3 } from "./connections.js";

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
export async function connectWallet(){
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        getBalance(account)
        console.log(account);
    
        fetch('../../users.json')
        .then(data => data.json())
        .then(respuesta => {
            // PASO 2
            controllerUsers(respuesta, account);
        })
    } catch (error) {
        console.error("No se a conectado la wallet: ", error)
    }
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
