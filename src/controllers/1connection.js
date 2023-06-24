// import { executeLastBlockAndEvent } from "./2blockchain_data.js";
import { Subject } from "../helpers/subject.js";

class ConnectionSubject extends Subject{
    constructor(){
        super();
        this.state = false;
    }
    notify(state){
        this.state = state;
        super.notify(this);
    }
}

class connectionObserver{
    notify(subject){
        console.log(subject.state)
    }
}

var connectionSubject = new ConnectionSubject();
let observer = new connectionObserver();
connectionSubject.subscribe(observer)


export function connecting() {
    return new Promise((resolve, reject) => {
        web3 = new Web3("wss://moonbeam-alpha.api.onfinality.io/public-ws");

        // Verificar la conexion
        web3.eth.net.isListening()
        .then(() =>{
            console.log("Connected")
            connectionSubject.notify(true)
        })
        .catch(err => console.log(err.message))
    });
}
  
  

connecting()


// let web3; // scope global para posterior a darle valor poder exportar y reutilizar. 

// export async function connectNetwork(){
//     await connecting();
//     // executeLastBlockAndEvent();
// }

// function connecting(){
//     localStorage.removeItem('ConnectionState');
//     return new Promise((resolve, reject) => {
//         // web3 = new Web3("wss://moonasdasdasdasbeam-alpha.api.onfinality.io/public-ws");
//         web3 = new Web3("wss://moonbeam-alpha.api.onfinality.io/public-ws");
//         // Verifica si la conexión es válida
//         web3.eth.net.isListening()
//         .then(() => {
//             localStorage.setItem('ConnectionState', JSON.stringify({
//                 state: true,
//                 text: '● Connected Moonbase Alpha'
//             }));
//             // Renderiza por primera vez
//             const current_blockchain = document.getElementById("current_blockchain");
//             current_blockchain.classList.add("active");
//             current_blockchain.textContent = "● Connected Moonbase Alpha";
//             resolve();
//         })
//         .catch(error => {
//             localStorage.setItem('ConnectionState', JSON.stringify({
//                 state: false,
//                 text: '○ Disconnected'
//               }));
//             reject(error.message);
//         });
//     })
// }

// connectNetwork()

// export {web3, connecting};
// // Se exporta connecting para importar en 3accounts.js y esperar la promesa de connecting, si la promesa rechaza, no permite conectar la wallet.


