import { add_chain_button} from "./src/controllers/chains.js";
import { button_sign, button_verify} from "./src/controllers/sign.js";
import { createWallet } from "./src/controllers/create_wallet.js";
import { submit_transaction } from "./src/controllers/transactions.js";
import { connect_button, providerChecker } from "./src/controllers/connections.js";
import { connectWallet} from "./src/controllers/accounts.js"

function verifyChecker(){
    if(!providerChecker){
        connect_button.onclick = connectWallet;
        console.log("Metamask Instalado")
    }
}

verifyChecker()