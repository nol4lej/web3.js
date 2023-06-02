import { currentAccount } from "./accounts.js";
import { web3 } from "./connections.js";

const value_transaction = document.getElementById("value_transaction")
const submit_transaction = document.getElementById("submit_transaction")
const addressTo = document.getElementById("trans_to")

submit_transaction.addEventListener("click", function (){
    const value = value_transaction.value;
    const valueString = value.toString()
    console.log(valueString)
    window.ethereum.request({ 
        method: "eth_sendTransaction",
        params: [{
            from: currentAccount,
            to: addressTo.value,
            value: web3.utils.toWei(valueString, 'wei'),
            gas: "21000",
        }],
        from: currentAccount,
    })
})

export {submit_transaction}