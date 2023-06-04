import MetaMaskSDK from '/node_modules/@metamask/sdk/dist/browser/es/metamask-sdk.js';
import { web3 } from "./1connections.js";

export let provider;
export let currentAccount = null; // Se utiliza en connectWallet para almacenar la wallet que se conecta y posteriormente se utiliza en handleAccountsChanged para manejar la actualización de la wallet conectada actual.
const connect_button = document.getElementById("connect_wallet");
const show_balance = document.getElementById("show_balance");
let accounts = []; // Creado para acceder a la cuenta conectada actual. Se utiliza en handleAccountsChanged.
let show_account = document.getElementById("show_account");
const copy_wallet = document.getElementById("copy_wallet")


// 1 - VERIFICAR PROVEEDOR (window.ethereum para desktop || provider = MMSDK.getProvider() dispositivos sin MetaMask y para Mobile)
function verifyProvider(){
    if(!window.ethereum){
        const MMSDK = new MetaMaskSDK()
        provider = MMSDK.getProvider()
        connect_button.onclick = connectWallet;
    } else {
        // const MMSDK = new MetaMaskSDK()
        // provider = MMSDK.getProvider()
        provider = window.ethereum;
        connect_button.onclick = connectWallet;
    }
}
verifyProvider()

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

async function connectWallet(){
    try {
        const account_connected = await provider.request({ method: 'eth_requestAccounts' })
        currentAccount = account_connected[0];
        show_account.textContent = currentAccount.slice(0, -35) + "..." + currentAccount.slice(-4);
    } catch (error) {
        console.log(error.message)
    }

}

async function getBalance(account){
    const balance = await web3.eth.getBalance(account);    
    const balance_legible = web3.utils.fromWei(balance, 'ether'); //Conversion del resultado hexadecimal a numero entero y aplicar el factor de conversion (wei a ether). El resultado es de tipo string.
    const balance_float = parseFloat(balance_legible)
    show_balance.textContent = balance_float.toFixed(4) + " DEV"; 
}

// Evento que detecta y reacciona al cambio de cuenta en la wallet (accountsChanged).
provider.on('accountsChanged', handleAccountsChanged);

// El parámetro accounts en handleAccountsChanged es el resultado enviado automáticamente cuando se produce el evento 'accountsChanged' o cuando se resuelve la promesa de eth_accounts.
function handleAccountsChanged(newAccount) {
    accounts = newAccount; //Reasignamos el valor del array accounts con el nuevo array obtenido
    // accounts contiene el array de cuentas actualizadas obtenido por el metodo "eth_accounts".
    if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
        show_account.textContent = "";
        show_balance.textContent = "";
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        getBalance(currentAccount)
        show_account.textContent = currentAccount.slice(0, -35) + "..." + currentAccount.slice(-4);
    }
}

//Maneja la cuenta activa
provider.request({ method: 'eth_accounts' })
    .then((newAccount) => {
        accounts = newAccount;
        // Cuando se resuelve la promesa, el resultado (array de cuentas) se pasa automáticamente como argumento a la función handleAccountsChanged.
        handleAccountsChanged(accounts);
    }) 
    .catch((err) => {
        console.error(err.message);
    });

copy_wallet.addEventListener("click", () => {
    navigator.clipboard.writeText(currentAccount)
    const copied_wallet = document.getElementById("copied_wallet");
    copied_wallet.classList.add("active")
    setTimeout(function() {
        copied_wallet.classList.remove('active');
      }, 1000);
})