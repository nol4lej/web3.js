import { web3 } from "./1connections.js";
import { handleChainChanged } from "./5chains.js";

const create_wallet = document.getElementById("create_wallet");
const public_key = document.getElementById("public_key");
const private_key = document.getElementById("private_key");
const wallets_created = document.getElementById("wallets_created");
const copy_public_key = document.getElementById("copy_public_key");
const copy_private_key = document.getElementById("copy_private_key");

export let new_wallet;

create_wallet.addEventListener("click", async () => {
    await handleChainChanged();
    new_wallet = web3.eth.accounts.create();
    wallets_created.style.display = "flex";
    public_key.textContent = new_wallet.address.slice(0,6)+"..."+new_wallet.address.slice(-4);
    private_key.textContent = new_wallet.privateKey.slice(0,6)+"..."+new_wallet.privateKey.slice(-4);
})

copy_public_key.addEventListener("click", () => {
    navigator.clipboard.writeText(new_wallet.address)
    // const copied_hash = document.getElementById("copied_hash");
    // copied_hash.classList.add("active")
    // setTimeout(function() {
    //     copied_hash.classList.remove('active');
    //   }, 1000);
})

copy_private_key.addEventListener("click", () => {
    navigator.clipboard.writeText(new_wallet.privateKey)
    // const copied_hash = document.getElementById("copied_hash");
    // copied_hash.classList.add("active")
    // setTimeout(function() {
    //     copied_hash.classList.remove('active');
    //   }, 1000);
})