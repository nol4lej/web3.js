import { currentAccount } from "./4accounts.js";
import { provider } from "./3connect_provider.js";
import { web3 } from "./1connections.js";
import { handleChainChanged } from "./5chains.js";
import { errorModal } from "./error_chain_modal.js";

const input_sign = document.getElementById("input_sign");
const button_sign = document.getElementById("submit_sign");
const input_hash = document.getElementById("input_hash");
const input_wallet = document.getElementById("input_wallet");
const input_msg = document.getElementById("input_msg");
const button_verify = document.getElementById("submit_verify_sign");
const sign_Hash = document.getElementById("sign_Hash");
const content_sign_hash = document.getElementById("content_sign_hash");
const copy_sign = document.getElementById("copy_sign");
const content_verify_sign = document.getElementById("content_verify_sign");
const verify_sign = document.getElementById("verify_sign");


let signatureHash;

button_sign.addEventListener("click", async () =>{
    await handleChainChanged();
    const texTo_sign = input_sign.value;
    if(!texTo_sign){
        errorModal("Invalid message")
    } else{
        provider.request({ 
            method: 'personal_sign',
            params: [texTo_sign, currentAccount, '']
        })
        .then(signature => {
            signatureHash = signature;
            content_sign_hash.style.display = "flex"
            sign_Hash.textContent = "Hash: " + signature.slice(0,6)+"..."+signature.slice(-4)
        })
        .catch(err => console.log(err.message));
    }
})

copy_sign.addEventListener("click", () => {
    navigator.clipboard.writeText(signatureHash)
    // const copied_hash = document.getElementById("copied_hash");
    // copied_hash.classList.add("active")
    // setTimeout(function() {
    //     copied_hash.classList.remove('active');
    //   }, 1000);
})


button_verify.addEventListener("click", async () => {
    await handleChainChanged();
    const hash = input_hash.value;
    const wallet = input_wallet.value;
    const message = input_msg.value;
    if (!hash || !message || !wallet) {
        if (!hash) {
            errorModal('Please enter a hash');
        } else if (!message) {
            errorModal('Please enter a message');
        } else if (!wallet) {
            errorModal('Please enter a wallet');
        }
      } else {
        const resultado = web3.eth.accounts.recover(message, hash)
        const validez = resultado.toLowerCase() === wallet.toLowerCase() ? "Firma valida" : "Firma invalida";
        content_verify_sign.style.display = "flex";
        verify_sign.textContent = validez;
        if(validez === "Firma valida"){
            verify_sign.classList.remove("invalid")
            verify_sign.classList.add("valid")
        } else {
            verify_sign.classList.remove("valid")
            verify_sign.classList.add("invalid")
        }
    }
})

export {button_sign, button_verify}