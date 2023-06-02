import { connectNetwork} from "./src/controllers/connections.js";
import { add_chain_button} from "./src/controllers/chains.js";
import { button_sign, button_verify} from "./src/controllers/sign.js";
import { createWallet } from "./src/controllers/create_wallet.js";
import { submit_transaction } from "./src/controllers/transactions.js";

connectNetwork();