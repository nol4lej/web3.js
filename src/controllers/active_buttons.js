const add_chain = document.getElementById("add_chain");
const submit_transaction = document.getElementById("submit_transaction");
const submit_sign = document.getElementById("submit_sign");
const submit_verify_sign = document.getElementById("submit_verify_sign");
const create_wallet = document.getElementById("create_wallet");

export function activeButtons(){
    add_chain.disabled = false;
    submit_transaction.disabled = false;
    submit_sign.disabled = false;
    submit_verify_sign.disabled = false;
    create_wallet.disabled = false;
}

export function disableButtons(){
    add_chain.disabled = true;
    submit_transaction.disabled = true;
    submit_sign.disabled = true;
    submit_verify_sign.disabled = true;
    create_wallet.disabled = true;
}