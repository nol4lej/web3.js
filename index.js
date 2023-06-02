import { connectNetwork, web3 } from "./src/controllers/connections.js";
import { addChain, add_chain} from "./src/controllers/addChain.js";
import { signMessage, verifySign} from "./src/controllers/sign.js";
import { createWallet } from "./src/controllers/create_wallet.js";
import { submit_transaction } from "./src/controllers/transactions.js";

connectNetwork();
add_chain.onclick = addChain;
