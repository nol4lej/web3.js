import { currentAccount} from "./4accounts.js";
import { provider } from "./3connect_provider.js";
import { web3 } from "./1connections.js";   
import { handleChainChanged } from "./5chains.js";
import { errorModal } from "./error_chain_modal.js";
import { fetchExplorer } from "./moonbase_api.js";

const value_transaction = document.getElementById("value_transaction");
const submit_transaction = document.getElementById("submit_transaction");
const addressTo = document.getElementById("trans_to");
const transaction_result = document.getElementById("transaction_result");
const transaction_status = document.getElementById("transaction_status");

submit_transaction.addEventListener("click", async () => {
    await handleChainChanged()
    if(value_transaction.value > 0){
        // 1 eth = 1000000000000000000 wei
        const valorHex = web3.utils.toHex("1000000000000000000" * value_transaction.value)
        provider.request({ 
            method: "eth_sendTransaction",
            params: [{
                from: currentAccount,
                to: addressTo.value,
                value: valorHex,
                gas: "21000",
            }],
            from: currentAccount,
        })
        .then(transactionHash => {
            // En caso de que ya haya una txn en el html, ahora se cambia por pendiente nuevamente.
            transaction_status.classList.remove("success");
            transaction_status.textContent = "● Pending";

            const transHash_short = transactionHash.slice(0,-60)+"..."+transactionHash.slice(-4)
            transaction_status.style.display = "flex";
            transaction_result.innerHTML = `Transaction Hash: <a href="https://moonbase.moonscan.io/tx/${transactionHash}" target="_blank">${transHash_short}</a>`
            const checkTransactionStatus = async () => {
                try {
                    const receipt = await web3.eth.getTransactionReceipt(transactionHash);
                    if (receipt) {
                        // console.log("Recibo de la transacción:", receipt);
                        transaction_status.classList.add("success");
                        transaction_status.textContent = "● Success";
                        return
                    }
        
                    // La transacción aún no ha sido minada, esperar y verificar nuevamente.
                    setTimeout(checkTransactionStatus, 1000);
                } catch (error) {
                    console.error("Error al obtener el recibo de la transacción:", error);
                }
            };
            checkTransactionStatus();
            setInterval(fetchExplorer, 2000)
        })
        .catch(error => {
            if(error.code === -32602){
                errorModal("Invalid wallet address")
            }
        })
    } else {
        errorModal("Enter a valid amount")
    }
})

export {submit_transaction}