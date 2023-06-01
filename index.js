import { connectNetwork, web3 } from "./src/controllers/connections.js";
import { addChain, add_chain} from "./src/controllers/addChain.js";
import { signMessage} from "./src/controllers/sign.js";


connectNetwork();
add_chain.onclick = addChain;

// sign_button;

// const newAccount = web3.eth.accounts.create();
// console.log(newAccount);