import { web3 } from "./1connections.js";

const create_wallet = document.getElementById("create_wallet")
function createWallet(){
    const new_wallet = web3.eth.accounts.create();
    console.log("Address:",new_wallet.address)
    console.log("Private key:",new_wallet.privateKey)
}

create_wallet.onclick = createWallet;

export {createWallet}