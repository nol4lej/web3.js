import { currentAccount } from "./accounts.js";
import { web3 } from "./connections.js";

const input_sign = document.getElementById("input_sign");
const button = document.getElementById("submit_sign");
const input_hash = document.getElementById("input_hash")
const input_wallet = document.getElementById("input_wallet")
const input_msg = document.getElementById("input_msg")
const button_verify = document.getElementById("submit_verify_sign")

async function signMessage(){
    const texTo_sign = input_sign.value;
    if(!texTo_sign){
        console.log("No hay texto para firmar.")
    } else{
        await window.ethereum.request({ 
            method: 'personal_sign',
            params: [texTo_sign, currentAccount, '']
        })
        .then(signature => console.log(signature))
        .catch(err => console.log(err.message));
    }
}
    
button.onclick = signMessage;

async function verifySign(){
    const hash = input_hash.value;
    const wallet = input_wallet.value;
    const message = input_msg.value;
    if(!hash || !message){
        console.log("No hay hash para verificar")
    } else{
        const resultado = web3.eth.accounts.recover(message, hash)
        const validez = resultado === wallet ? "Firma valida" : "Firma invalida";
        console.log(validez)
    }
}

button_verify.onclick = verifySign

export {signMessage, verifySign}