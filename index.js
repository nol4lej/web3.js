import { connectNetwork, web3 } from "./src/controllers/connections.js";
import { addChain, add_chain} from "./src/controllers/addChain.js";


connectNetwork();


add_chain.onclick = addChain;

